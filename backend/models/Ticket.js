const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide ticket name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide ticket description']
  },
  price: {
    type: Number,
    required: [true, 'Please provide ticket price'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    required: [true, 'Please provide original price']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative'],
    max: [100, 'Discount cannot be more than 100%']
  },
  category: {
    type: String,
    required: [true, 'Please provide ticket category'],
    enum: ['VIP', 'General', 'Student', 'Early Bird', 'Group']
  },
  features: [{
    type: String,
    required: true
  }],
  totalQuantity: {
    type: Number,
    required: [true, 'Please provide total quantity'],
    min: [1, 'Quantity must be at least 1']
  },
  soldQuantity: {
    type: Number,
    default: 0,
    min: [0, 'Sold quantity cannot be negative']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  saleStartDate: {
    type: Date,
    required: [true, 'Please provide sale start date']
  },
  saleEndDate: {
    type: Date,
    required: [true, 'Please provide sale end date']
  },
  image: {
    type: String,
    default: ''
  },
  // Store simple buyer records when tickets are purchased via Ticketing flow
  purchases: [{
    name: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    quantity: { type: Number, required: true, min: 1 },
    totalAmount: { type: Number, required: true, min: 0 },
    createdAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

// Virtual for available quantity
ticketSchema.virtual('availableQuantity').get(function() {
  return this.totalQuantity - this.soldQuantity;
});

// Virtual for current price (with discount applied)
ticketSchema.virtual('currentPrice').get(function() {
  if (this.discount > 0) {
    return this.originalPrice * (1 - this.discount / 100);
  }
  return this.originalPrice;
});

// Ensure virtual fields are serialized
ticketSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Ticket', ticketSchema);

