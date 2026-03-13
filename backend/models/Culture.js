const mongoose = require('mongoose');

const cultureSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    trim: true
  },
  region: {
    type: String,
    enum: ['Asia', 'Europe', 'Africa', 'Americas', 'Oceania'],
    required: true
  },
  category: {
    type: String,
    enum: ['Festival', 'Food', 'Tradition', 'Other'],
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  story: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300'
  },
  imagePublicId: {
    type: String,
    default: ''
  },
  videoUrl: {
    type: String,
    default: ''
  },
  videoPublicId: {
    type: String,
    default: ''
  },
  likes: {
    type: Number,
    default: 0
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  createdBy: {
    type: String,
    default: 'Anonymous'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Culture', cultureSchema);