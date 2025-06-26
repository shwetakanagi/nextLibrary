const express = require('express');
const router = express.Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');

// Middleware to verify token
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Contains: { id, role }
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
}

// Get current user profile
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});


// Update current user profile
router.put('/me', authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;

    // Find user by id from auth middleware
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update allowed fields
    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    // Return updated user data (without password)
    const updatedUser = await User.findById(user.id).select('-password');

    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (err) {
    // Handle duplicate email error code
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    res.status(500).json({ message: 'Error updating user profile' });
  }
});


module.exports = router;
