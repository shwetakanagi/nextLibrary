const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String },
  coverImage: { type: String }, // URL of book cover
  description: { type: String },
  available: { type: Boolean, default: true },
  price: {
    type: Number,
    required: true,
    min: 0
  },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
