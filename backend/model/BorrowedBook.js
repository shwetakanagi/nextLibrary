const mongoose = require('mongoose');

const borrowedBookSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  borrowDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returned: { type: Boolean, default: false },
});

module.exports = mongoose.model('BorrowedBook', borrowedBookSchema);
