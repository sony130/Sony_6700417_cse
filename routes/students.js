const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET /students - Fetch all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching students',
      error: error.message
    });
  }
});

// POST /students - Add new student
router.post('/', async (req, res) => {
  try {
    console.log('Request body:', req.body);
    
    const { id, name, course, age, city } = req.body;

    // Basic validation
    if (!id || !name || !course) {
      return res.status(400).json({
        success: false,
        message: 'ID, name and course are required fields'
      });
    }

    const student = new Student({
      id,
      name,
      course,
      age,
      city
    });

    const savedStudent = await student.save();
    
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: savedStudent
    });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating student',
      error: error.message
    });
  }
});

// PUT /students/:id - Update student info
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, course, age, city } = req.body;

    const updatedStudent = await Student.findOneAndUpdate(
      { id: id },
      { name, course, age, city },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating student',
      error: error.message
    });
  }
});

// DELETE /students/:id - Delete student
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudent = await Student.findOneAndDelete({ id: id });
    
    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      message: 'Student deleted successfully',
      data: deletedStudent
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error deleting student',
      error: error.message
    });
  }
});

// GET /students/:id - Get single student by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findOne({ id: id });
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error fetching student',
      error: error.message
    });
  }
});

module.exports = router;