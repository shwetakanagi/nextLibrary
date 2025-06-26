const express = require('express');
const router = express.Router();
const Notification = require('../model/Notification');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// GET all notifications for logged-in staff
router.get('/', async (req, res) => {
  if (req.user.role !== 'staff') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notifications', error: err.message });
  }
});

// PUT to mark a notification as read
router.put('/:id/read', async (req, res) => {
  if (req.user.role !== 'staff') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update notification', error: err.message });
  }
});

module.exports = router;
