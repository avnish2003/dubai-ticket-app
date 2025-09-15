const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  origin: {
    type: String,
    required: true,
    trim: true
  },
  flag: {
    type: String,
    required: true
  },
  style: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  achievements: [{
    type: String
  }],
  image: {
    type: String,
    default: ''
  },
  socialMedia: {
    instagram: {
      type: String,
      default: ''
    },
    youtube: {
      type: String,
      default: ''
    },
    facebook: {
      type: String,
      default: ''
    },
    twitter: {
      type: String,
      default: ''
    }
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    required: true,
    enum: ['bachata', 'salsa', 'kizomba', 'dj', 'other']
  },
  performanceTime: {
    type: Date
  },
  workshopSchedule: [{
    title: String,
    date: Date,
    duration: Number, // in minutes
    description: String,
    maxParticipants: Number
  }]
}, {
  timestamps: true
});

// Index for better query performance
artistSchema.index({ name: 1 });
artistSchema.index({ category: 1 });
artistSchema.index({ isFeatured: 1 });

module.exports = mongoose.model('Artist', artistSchema);



