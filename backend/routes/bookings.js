const express = require('express');
const { body } = require('express-validator');
const {
  createBooking,
  getUserBookings,
  getBooking,
  updatePaymentStatus,
  cancelBooking,
  getAllBookings
} = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const bookingValidation = [
  body('tickets')
    .isArray({ min: 1 })
    .withMessage('At least one ticket is required'),
  body('tickets.*.ticketId')
    .isMongoId()
    .withMessage('Invalid ticket ID'),
  body('tickets.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('paymentMethod')
    .isIn(['stripe', 'paypal', 'bank_transfer'])
    .withMessage('Invalid payment method'),
  body('contactInfo.name')
    .trim()
    .notEmpty()
    .withMessage('Contact name is required'),
  body('contactInfo.email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid contact email is required'),
  body('contactInfo.phone')
    .matches(/^\+?[\d\s-()]+$/)
    .withMessage('Valid contact phone is required'),
  body('eventDate')
    .isISO8601()
    .withMessage('Valid event date is required')
];

// @route   POST /api/bookings
// @desc    Create new booking
// @access  Private
router.post('/', protect, bookingValidation, createBooking);

// @route   GET /api/bookings
// @desc    Get user bookings
// @access  Private
router.get('/', protect, getUserBookings);

// @route   GET /api/bookings/admin/all
// @desc    Get all bookings (Admin)
// @access  Private/Admin
router.get('/admin/all', protect, admin, getAllBookings);

// @route   GET /api/bookings/:id
// @desc    Get single booking
// @access  Private
router.get('/:id', protect, getBooking);

// @route   PUT /api/bookings/:id/payment
// @desc    Update booking payment status
// @access  Private
router.put('/:id/payment', protect, updatePaymentStatus);

// @route   PUT /api/bookings/:id/cancel
// @desc    Cancel booking
// @access  Private
router.put('/:id/cancel', protect, cancelBooking);

module.exports = router;




