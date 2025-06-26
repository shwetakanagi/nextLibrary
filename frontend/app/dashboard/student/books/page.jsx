
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BookBrowse() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/books')
      .then(res => res.json())
      .then(setBooks)
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Browse Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map(book => (
          <Link href={`/dashboard/student/books/${book._id}`} key={book._id}>
            <div className="p-4 bg-white rounded shadow hover:shadow-lg transition cursor-pointer">
              <img src={book.coverImage} alt={book.title} className="w-full h-48 object-cover rounded mb-3" />
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-600">by {book.author}</p>
              <p className="text-sm text-green-600">${book.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

