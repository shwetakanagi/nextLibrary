
'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page({ params }) {
  const { id } = use(params);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
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

  function addToCart() {
    if (!book) return;
    setCart((prev) =>
      prev.find((item) => item._id === book._id) ? prev : [...prev, book]
    );
    alert(`Added "${book.title}" to cart!`);
  }

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!book) return <p className="text-center py-10 text-red-500">Book not found.</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row gap-8 bg-white shadow-md rounded-lg p-6">
        {/* Book Cover */}
        <div className="md:w-1/3">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Book Info */}
        <div className="md:w-2/3 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{book.title}</h1>
            <h2 className="text-xl text-gray-600 mb-2">by {book.author}</h2>

            {book.category && (
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                {book.category}
              </span>
            )}

            <p className="text-lg font-semibold text-green-600 mb-4">
              ${book.price?.toFixed(2)}
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed whitespace-pre-line">
              {book.description}
            </p>
          </div>

          <button
            onClick={addToCart}
            className="self-start px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition shadow"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Cart Display */}
      {cart.length > 0 && (
        <div className="mt-12 border-t pt-6">
          <h3 className="text-2xl font-bold mb-4">🛒 Cart</h3>
          <ul className="space-y-2 list-disc pl-6 text-gray-700">
            {cart.map((item) => (
              <li key={item._id}>
                {item.title} by {item.author} — ${item.price?.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
