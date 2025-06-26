
'use client';

import { useEffect, useState } from 'react';
import toast, {Toaster}from 'react-hot-toast'; // ✅ Import toast
 
export default function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    author: '',
    category: '',
    coverImage: '',
    description: '',
    price: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/books');
      if (!res.ok) throw new Error('Failed to fetch books');
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error('Fetch error:', err);
      toast.error('Error fetching books');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    const { title, author, price } = form;
    if (!title || !author || price === '') {
      toast.error('Title, Author, and Price are required');
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      toast.error('Price must be a valid positive number');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parsedPrice,
          available: true
        })
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('API error:', data.error || data.message);
        toast.error(data.error || 'Failed to add book');
        return;
      }

      toast.success('📚 Book added successfully');

      setForm({
        title: '',
        author: '',
        category: '',
        coverImage: '',
        description: '',
        price: ''
      });

      fetchBooks();
    } catch (error) {
      console.error(error);
      toast.error('Error adding book');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this book?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: 'DELETE'
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Delete error:', data.message);
        toast.error(data.message || 'Failed to delete book');
        return;
      }

      toast.success('🗑️ Book deleted');
      fetchBooks();
    } catch (error) {
      console.error(error);
      toast.error('Error deleting book');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📚 Manage Books</h1>

      {/* Add Book Form */}
      <form onSubmit={handleAddBook} className="mb-8 bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4">Add New Book</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="p-2 border rounded" required />
          <input name="author" placeholder="Author" value={form.author} onChange={handleChange} className="p-2 border rounded" required />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="p-2 border rounded" />
          <input name="coverImage" placeholder="Cover Image URL" value={form.coverImage} onChange={handleChange} className="p-2 border rounded" />
          <input name="price" placeholder="Price" type="number" step="0.01" value={form.price} onChange={handleChange} className="p-2 border rounded" required />
          <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className="p-2 border rounded" />
        </div>
        <button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Add Book
        </button>
      </form>

      {/* Book List Table */}
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4">Book List</h2>
        {loading ? (
          <p>Loading books...</p>
        ) : (
          <table className="w-full text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Author</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center">
                    No books found.
                  </td>
                </tr>
              ) : (
                books.map((book) => (
                  <tr key={book._id} className="border-t">
                    <td className="p-2 border">{book.title}</td>
                    <td className="p-2 border">{book.author}</td>
                    <td className="p-2 border">${book.price.toFixed(2)}</td>
                    <td className="p-2 border">{book.category || '-'}</td>
                    <td className="p-2 border">
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
