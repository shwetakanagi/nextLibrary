// routes/staffBorrow.js
const express = require('express');
const Borrow = require('../model/Borrow');
const Book = require('../model/Book');
const User = require('../model/User');
const auth = require('../middleware/auth');
const router = express.Router();

// GET all borrow requests
router.get('/', auth, async (req, res) => {
  try {
    const borrowRequests = await Borrow.find()
      .populate('user', 'name email')
      .populate('book', 'title author');
    res.json(borrowRequests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch borrow requests', error: err.message });
  }
});

// PUT to approve a borrow request
router.put('/approve/:id', auth, async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.params.id);
    if (!borrow) return res.status(404).json({ message: 'Borrow request not found' });

    borrow.approved = true;
    await borrow.save();

    res.json({ message: 'Borrow request approved' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to approve request', error: err.message });
  }
});

// PUT to mark a borrow as returned
router.put('/return/:id', auth, async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.params.id);
    if (!borrow) return res.status(404).json({ message: 'Borrow record not found' });

    borrow.returned = true;
    borrow.returnedAt = new Date();
    await borrow.save();

    res.json({ message: 'Book return marked by staff' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to mark return', error: err.message });
  }
});

module.exports = router;
