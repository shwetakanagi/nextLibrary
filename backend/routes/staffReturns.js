// routes/staffReturns.js
const express = require('express');
const auth = require('../middleware/auth');
const Borrow = require('../model/Borrow');
const StudentHistory = require('../model/StudentHistory');
const Book = require('../model/Book');

const router = express.Router();

// @route   GET /api/staff/returns
// @desc    Get all borrow records that are not returned
router.get('/', auth, async (req, res) => {
  try {
    const borrowRecords = await Borrow.find({ returned: false })
      .populate('user', 'name')
      .populate('book', 'title');
    res.json(borrowRecords);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch borrow records', error: err.message });
  }
});

// @route   PUT /api/staff/returns/approve/:id
// @desc    Approve a return request
router.put('/approve/:id', auth, async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.params.id);
    if (!borrow) return res.status(404).json({ message: 'Borrow record not found' });

    borrow.returned = true;
    borrow.returnedAt = new Date();
    await borrow.save();

    await StudentHistory.create({
      user: borrow.user,
      book: borrow.book,
      borrowedAt: borrow.borrowedAt,
      returnedAt: borrow.returnedAt,
    });

    res.status(200).json({ message: 'Return approved and logged in history' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to approve return', error: err.message });
  }
});

module.exports = router;
