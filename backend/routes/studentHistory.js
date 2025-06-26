const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const StudentHistory = require('../model/StudentHistory');

router.use(auth);

// GET /api/student/history
router.get('/', async (req, res) => {
  try {
    const history = await StudentHistory.find({ user: req.user._id })
      .populate('book')
      .sort({ returnedAt: -1 });

    res.json(history);
  } catch (err) {
    console.error('Error fetching student history:', err);
    res.status(500).json({ message: 'Failed to fetch student history' });
  }
});


// DELETE /api/student/history
router.delete('/delete',  async (req, res) => {
  try {
    await StudentHistory.deleteMany({ user: req.user._id });
    res.status(200).json({ message: 'Borrowing history cleared.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to clear history', error: err.message });
  }
});

module.exports = router;
