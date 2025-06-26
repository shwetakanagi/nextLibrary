
const express = require('express');
const auth = require('../middleware/auth');
const Borrow = require('../model/Borrow');
const StudentHistory = require('../model/StudentHistory');
const Book = require('../model/Book');
const User = require('../model/User');
const Notification = require('../model/Notification');

const router = express.Router();

// ✅ Borrow a book
router.post('/', auth, async (req, res) => {
  const { bookId } = req.body;

  try {
    const existing = await Borrow.findOne({ user: req.user._id, book: bookId, returned: false });
    if (existing) return res.status(400).json({ message: 'Book already borrowed' });

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 2 weeks

    const newBorrow = new Borrow({
      user: req.user._id,
      book: bookId,
      dueDate
    });

    await newBorrow.save();

    // ✅ Notification for student
    await Notification.create({
      user: req.user._id,
      message: `You borrowed "${book.title}". Due date: ${dueDate.toLocaleDateString()}.`,
      read: false
    });

    // ✅ Notify all staff
    const staffUsers = await User.find({ role: 'staff' });
    for (const staff of staffUsers) {
      await Notification.create({
        user: staff._id,
        message: `Student ${req.user.name || req.user.email} borrowed the book "${book.title}".`,
        read: false
      });
    }

    res.status(201).json({ message: 'Book borrowed successfully', dueDate });
  } catch (err) {
    res.status(500).json({ message: 'Failed to borrow book', error: err.message });
  }
});


// ✅ Return a book
router.put('/return/:id', auth, async (req, res) => {
  try {
    const borrow = await Borrow.findOne({ _id: req.params.id, user: req.user._id }).populate('book');

    if (!borrow) return res.status(404).json({ message: 'Borrow record not found' });
    if (borrow.returned) return res.status(400).json({ message: 'Book already returned' });

    borrow.returned = true;
    borrow.returnedAt = new Date();
    await borrow.save();

    await StudentHistory.create({
      user: req.user._id,
      book: borrow.book._id,
      borrowedAt: borrow.borrowedAt,
      returnedAt: borrow.returnedAt
    });

    // ✅ Notification for student
    await Notification.create({
      user: req.user._id,
      message: `You returned "${borrow.book.title}". Thank you!`,
      read: false
    });

    // ✅ Notify all staff
    const staffUsers = await User.find({ role: 'staff' });
    for (const staff of staffUsers) {
      await Notification.create({
        user: staff._id,
        message: `Student ${req.user.name || req.user.email} returned the book "${borrow.book.title}".`,
        read: false
      });
    }

    res.status(200).json({ message: 'Book returned and logged in history' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to return book', error: err.message });
  }
});

module.exports = router;
