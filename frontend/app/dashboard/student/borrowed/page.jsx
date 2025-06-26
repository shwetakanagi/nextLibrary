
'use client';

import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function BorrowedBooksPage() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/borrowed', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setBorrowedBooks(data);
        setLoading(false);
      });
  }, []);

  const handleReturn = async (borrowId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/borrow/return/${borrowId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      toast.success('Book returned successfully!');
      setBorrowedBooks(prev => prev.filter(b => b._id !== borrowId));
    } else {
      const err = await res.json();
      toast.error('Failed to return the book: ' + err.message);
    }
  };

  if (loading) return <p className="text-center py-10">Loading borrowed books...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Toaster position="top-right" reverseOrder={false} />
      
      <h1 className="text-2xl font-bold mb-6">Your Borrowed Books</h1>

      {borrowedBooks.length === 0 ? (
        <p>No books borrowed yet.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Cover</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Author</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Borrowed At</th>
              <th className="border p-2">Due Date</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map(borrow => (
              <tr key={borrow._id}>
                <td className="border p-2">
                  <img src={borrow.book.coverImage} className="w-16 h-20 object-cover rounded" />
                </td>
                <td className="border p-2">{borrow.book.title}</td>
                <td className="border p-2">{borrow.book.author}</td>
                <td className="border p-2">${borrow.book.price}</td>
                <td className="border p-2">{new Date(borrow.borrowedAt).toLocaleDateString()}</td>
                <td className="border p-2">
                  {borrow.dueDate ? new Date(borrow.dueDate).toLocaleDateString() : 'N/A'}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleReturn(borrow._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Return
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
