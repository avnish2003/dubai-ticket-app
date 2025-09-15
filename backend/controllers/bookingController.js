const Booking = require('../models/Booking');
const Ticket = require('../models/Ticket');
const mongoose = require('mongoose');
const stripeLib = process.env.STRIPE_SECRET_KEY ? require('stripe')(process.env.STRIPE_SECRET_KEY) : null;

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    const { tickets, paymentMethod, contactInfo, eventDate, notes } = req.body;

    if (!Array.isArray(tickets) || tickets.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one ticket is required' });
    }

    if (!contactInfo || !contactInfo.name || !contactInfo.email || !contactInfo.phone) {
      return res.status(400).json({ success: false, message: 'Contact info (name, email, phone) is required' });
    }

    if (!eventDate || isNaN(Date.parse(eventDate))) {
      return res.status(400).json({ success: false, message: 'Valid eventDate (ISO string) is required' });
    }

    // Validate and prepare tickets
    let totalAmount = 0;
    const preparedTickets = [];

    for (const item of tickets) {
      const { ticketId, quantity } = item || {};
      if (!ticketId || !quantity || quantity < 1) {
        return res.status(400).json({ success: false, message: 'Each ticket needs valid ticketId and quantity' });
      }
      if (!mongoose.isValidObjectId(ticketId)) {
        return res.status(400).json({ success: false, message: `Invalid ticketId: ${ticketId}` });
      }

      const ticket = await Ticket.findById(ticketId);
      if (!ticket || !ticket.isActive) {
        return res.status(404).json({ success: false, message: 'Ticket not found or inactive' });
      }
      if (ticket.soldQuantity + quantity > ticket.totalQuantity) {
        return res.status(400).json({ success: false, message: `Not enough availability for ${ticket.name}` });
      }

      const currentPrice = ticket.discount > 0
        ? ticket.originalPrice * (1 - ticket.discount / 100)
        : ticket.originalPrice;

      preparedTickets.push({ ticket: ticket._id, quantity, price: currentPrice });
      totalAmount += currentPrice * quantity;
    }

    // Payment intent (Stripe or mock)
    let paymentIntent = { id: `pi_mock_${Date.now()}`, client_secret: `pi_mock_${Date.now()}_secret` };
    if (stripeLib && paymentMethod === 'stripe') {
      try {
        paymentIntent = await stripeLib.paymentIntents.create({
          amount: Math.round(totalAmount * 100),
          currency: 'usd',
          metadata: { userId: req.user._id.toString(), eventDate: eventDate }
        });
      } catch (stripeError) {
        // Fallback to mock intent so booking still works
        paymentIntent = { id: `pi_mock_${Date.now()}`, client_secret: `pi_mock_${Date.now()}_secret` };
      }
    }

    // Generate booking reference
    const generateBookingReference = () => {
      const timestamp = Date.now().toString(36).toUpperCase();
      const random = Math.random().toString(36).substr(2, 5).toUpperCase();
      return `LN${timestamp}${random}`;
    };

    // Create booking document matching schema
    const booking = await Booking.create({
      user: req.user._id,
      tickets: preparedTickets,
      totalAmount,
      paymentStatus: 'pending',
      paymentMethod,
      paymentId: paymentIntent.id,
      eventDate: new Date(eventDate),
      contactInfo,
      notes,
      bookingReference: generateBookingReference()
    });

    // Increment sold quantities
    for (const item of tickets) {
      await Ticket.findByIdAndUpdate(item.ticketId, { $inc: { soldQuantity: item.quantity } });
    }

    await booking.populate('tickets.ticket');

    return res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: { booking, clientSecret: paymentIntent.client_secret }
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({ success: false, message: 'Server error during booking creation' });
  }
};

// @desc    Get all bookings for a user
// @route   GET /api/bookings
// @access  Private
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('tickets.ticket')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('tickets.ticket')
      .populate('user', 'name email phone');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update booking payment status
// @route   PUT /api/bookings/:id/payment
// @access  Private/Admin
const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    booking.paymentStatus = paymentStatus;
    await booking.save();

    res.json({
      success: true,
      message: 'Payment status updated successfully',
      data: booking
    });
  } catch (error) {
    console.error('Update payment status error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Cancel a booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('tickets.ticket');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Booking is already cancelled' });
    }

    booking.status = 'cancelled';
    await booking.save();

    // Refund tickets (decrease sold quantity)
    for (const ticketData of booking.tickets) {
      await Ticket.findByIdAndUpdate(ticketData.ticket._id, {
        $inc: { soldQuantity: -ticketData.quantity }
      });
    }

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings/admin/all
// @access  Admin
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('tickets.ticket')
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getBooking,
  updatePaymentStatus,
  cancelBooking,
  getAllBookings
};
