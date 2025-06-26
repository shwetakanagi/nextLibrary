const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  borrowedAt: { type: Date, default: Date.now },
  returned: { type: Boolean, default: false },
  dueDate: { type: Date } // optional
});

module.exports = mongoose.model('Borrow', borrowSchema);
