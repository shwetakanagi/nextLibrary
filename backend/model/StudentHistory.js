const mongoose = require('mongoose');

const studentHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  borrowedAt: { type: Date, required: true },
  returnedAt: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('StudentHistory', studentHistorySchema);
