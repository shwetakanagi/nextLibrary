// routes/staffStudents.js
const express = require('express');
const auth = require('../middleware/auth');
const User = require('../model/User'); // Assuming students are stored in the User model

const router = express.Router();

// @route   GET /api/staff/students
// @desc    Get all students
router.get('/', auth, async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('name email');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch students', error: err.message });
  }
});

module.exports = router;
