const express = require('express');
const router = express.Router();
const Notification = require('../model/Notification');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// GET all notifications for the logged-in student
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notifications', error: err.message });
  }
});

// ✅ PUT to mark a notification as read
router.put('/:id/read', async (req, res) => {
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

// DELETE all read notifications for student
router.delete('/clear-read', auth, async (req, res) => {
  try {
    await Notification.deleteMany({ user: req.user._id, read: true });
    res.status(200).json({ message: 'Read notifications cleared' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to clear notifications', error: err.message });
  }
});

module.exports = router;
