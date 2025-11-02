const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, 'ID is required'],
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  course: {
    type: String,
    required: [true, 'Course is required'],
    trim: true
  },
  age: {
    type: Number,
    min: [10, 'Age must be at least 10'],
    max: [100, 'Age cannot exceed 100']
  },
  city: {
    type: String,
    trim: true,
    default: 'Not specified'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);