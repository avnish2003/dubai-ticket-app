const Ticket = require('../models/Ticket');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

// @desc    Get all tickets
// @route   GET /api/tickets
// @access  Public
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ isActive: true })
      .sort({ price: 1 });

    res.json({
      success: true,
      count: tickets.length,
      data: tickets
    });
  } catch (error) {
    console.error('Get tickets error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single ticket
// @route   GET /api/tickets/:id
// @access  Public
const getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }

    res.json({
      success: true,
      data: ticket
    });
  } catch (error) {
    console.error('Get ticket error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private/Admin
const createTicket = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const ticket = await Ticket.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Ticket created successfully',
      data: ticket
    });
  } catch (error) {
    console.error('Create ticket error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private/Admin
const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }

    res.json({
      success: true,
      message: 'Ticket updated successfully',
      data: ticket
    });
  } catch (error) {
    console.error('Update ticket error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private/Admin
const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }

    res.json({
      success: true,
      message: 'Ticket deleted successfully'
    });
  } catch (error) {
    console.error('Delete ticket error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update ticket availability
// @route   PUT /api/tickets/:id/availability
// @access  Private/Admin
const updateAvailability = async (req, res) => {
  try {
    const { soldQuantity } = req.body;

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }

    if (soldQuantity > ticket.totalQuantity) {
      return res.status(400).json({
        success: false,
        message: 'Sold quantity cannot exceed total quantity'
      });
    }

    ticket.soldQuantity = soldQuantity;
    await ticket.save();

    res.json({
      success: true,
      message: 'Availability updated successfully',
      data: ticket
    });
  } catch (error) {
    console.error('Update availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Record a direct ticket purchase (without booking document)
// @route   POST /api/tickets/:id/purchase
// @access  Private
const purchaseTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, quantity } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ticket id' });
    }
    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'name, email and phone are required' });
    }
    if (!quantity || quantity < 1) {
      return res.status(400).json({ success: false, message: 'quantity must be at least 1' });
    }

    const ticket = await Ticket.findById(id);
    if (!ticket || !ticket.isActive) {
      return res.status(404).json({ success: false, message: 'Ticket not found or inactive' });
    }
    const available = ticket.totalQuantity - ticket.soldQuantity;
    if (quantity > available) {
      return res.status(400).json({ success: false, message: 'Not enough tickets available' });
    }

    const currentPrice = ticket.discount > 0
      ? ticket.originalPrice * (1 - ticket.discount / 100)
      : ticket.originalPrice;

    const totalAmount = currentPrice * quantity;

    ticket.purchases.push({ name, email, phone, quantity, totalAmount });
    ticket.soldQuantity += quantity;
    await ticket.save();

    return res.status(201).json({
      success: true,
      message: 'Purchase recorded',
      data: {
        ticketId: ticket._id,
        name,
        email,
        phone,
        quantity,
        totalAmount
      }
    });
  } catch (error) {
    console.error('Purchase ticket error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  updateAvailability,
  purchaseTicket
};




