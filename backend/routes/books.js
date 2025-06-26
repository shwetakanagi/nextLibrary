const express = require('express');
const Book = require('../model/Book');
const router = express.Router();


// @desc    Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// @desc    Get book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});


// @desc    Add a new book
// @desc Add a new book
router.post('/', async (req, res) => {
  try {
    const {
      title,
      author,
      category,
      coverImage,
      description,
      available,
      price // ✅ Include this
    } = req.body;

    const newBook = new Book({
      title,
      author,
      category,
      coverImage,
      description,
      available,
      price // ✅ Also add it here
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    console.error('❌ Book creation error:', err.message);
    res.status(400).json({ message: 'Error creating book', error: err.message });
  }
});

// @route   PUT /api/books/:id
// @desc    Update a book
router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: 'Error updating book', error: err.message });
  }
});

// @route   DELETE /api/books/:id
// @desc    Delete a book
router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting book', error: err.message });
  }
});

module.exports = router;
