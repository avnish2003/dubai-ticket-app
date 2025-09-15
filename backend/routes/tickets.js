const express = require('express');
const { body } = require('express-validator');
const {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  updateAvailability,
  purchaseTicket
} = require('../controllers/ticketController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const ticketValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Ticket name is required'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Ticket description is required'),
  body('price')
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('originalPrice')
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('Original price must be a positive number'),
  body('category')
    .isIn(['VIP', 'General', 'Student', 'Early Bird', 'Group'])
    .withMessage('Invalid ticket category'),
  body('totalQuantity')
    .isInt({ min: 1 })
    .withMessage('Total quantity must be at least 1'),
  body('saleStartDate')
    .isISO8601()
    .withMessage('Sale start date must be a valid date'),
  body('saleEndDate')
    .isISO8601()
    .withMessage('Sale end date must be a valid date')
];

// @route   GET /api/tickets
// @desc    Get all tickets
// @access  Public
router.get('/', getTickets);

// @route   GET /api/tickets/:id
// @desc    Get single ticket
// @access  Public
router.get('/:id', getTicket);

// @route   POST /api/tickets
// @desc    Create new ticket
// @access  Private/Admin
router.post('/', protect, admin, ticketValidation, createTicket);

// @route   PUT /api/tickets/:id
// @desc    Update ticket
// @access  Private/Admin
router.put('/:id', protect, admin, ticketValidation, updateTicket);

// @route   DELETE /api/tickets/:id
// @desc    Delete ticket
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteTicket);

// @route   PUT /api/tickets/:id/availability
// @desc    Update ticket availability
// @access  Private/Admin
router.put('/:id/availability', protect, admin, updateAvailability);

// @route   POST /api/tickets/:id/purchase
// @desc    Record a purchase with buyer info (no booking doc)
// @access  Private
router.post('/:id/purchase', protect, purchaseTicket);

module.exports = router;




