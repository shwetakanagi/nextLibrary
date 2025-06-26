
'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BookDetail({ params }) {
  const { id } = use(params); // ✅ unwraps the params promise

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(`http://localhost:5000/api/books/${id}`);
        if (!res.ok) throw new Error('Book not found');
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error(err);
        router.push('/404');
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id, router]);

  const handleBorrow = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/borrow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId: book._id }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || 'Book borrowed successfully!');
        router.push('/dashboard/student/borrowed');
      } else {
        alert(data.message || 'Failed to borrow book.');
      }
    } catch (error) {
      alert('Error borrowing book.');
      console.error(error);
    }
  };

  if (loading) return <p className="text-center py-12 text-gray-600">Loading book...</p>;
  if (!book) return <p className="text-center py-12 text-red-500">Book not found.</p>;

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-10 bg-white shadow-md rounded-xl p-6">
        <div className="md:w-1/3">
          <img
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            className="w-full h-[400px] object-cover rounded-lg shadow"
          />
        </div>

        <div className="md:w-2/3 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{book.title}</h1>
            <h2 className="text-xl text-gray-600 mb-2">by {book.author}</h2>
            {book.category && (
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                {book.category}
              </span>
            )}
            <p className="text-2xl font-semibold text-green-600 mb-4">${book.price?.toFixed(2)}</p>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">{book.description}</p>
          </div>

          <button
            onClick={handleBorrow}
            className="w-fit px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition shadow"
          >
            📖 Borrow Book
          </button>
        </div>
      </div>
    </main>
  );
}
