// routes/staff.js
const express = require('express');
const auth = require('../middleware/auth');
const User = require('../model/User');

const router = express.Router();

// GET staff profile
router.get('/profile', auth, async (req, res) => {
  try {
    if (req.user.role !== 'staff') {
      return res.status(403).json({ message: 'Access denied' });
    }
    res.json(req.user); // sends user data except password (because of select('-password') in auth)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// UPDATE staff profile
router.put('/profile', auth, async (req, res) => {
  try {
    if (req.user.role !== 'staff') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { name, email } = req.body;
    if (name) req.user.name = name;
    if (email) req.user.email = email;

    await req.user.save();

    res.json({ message: 'Profile updated successfully', user: req.user });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate email error
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
