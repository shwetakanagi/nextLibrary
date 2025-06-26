const express = require('express');
const auth = require('../middleware/auth');
const Borrow = require('../model/Borrow');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const borrowedBooks = await Borrow.find({
      user: req.user._id,
      returned: false
    }).populate('book'); // ✅ this is important

    res.json(borrowedBooks);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch borrowed books' });
  }
});



module.exports = router;
