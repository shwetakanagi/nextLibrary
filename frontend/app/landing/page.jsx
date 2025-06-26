
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import BookShowcase from '../components/BookShowcase';


export default function Landing() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/books')
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error('Failed to fetch books:', err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">📚 Library System</h1>
          <div className="flex space-x-4">
            <Link href="/Signup">
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Sign Up</button>
            </Link>
            <Link href="/login">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Login</button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with Image */}
      <section className="bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Text Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Welcome to Your Digital Library
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              A powerful platform to search, borrow, and manage books for students, staff, and administrators.
            </p>
            <Link href="/login">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Get Started
              </button>
            </Link>
          </div>

          {/* Hero Image */}
          <div className="w-full">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80"
              alt="Library books"
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Featured Books */}
      {/* <section className="max-w-7xl mx-auto py-16 px-4">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-10">Featured Books</h3>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
       {books.map((book) => (
  <div key={book._id} className="bg-white p-4 shadow rounded hover:shadow-lg transition">
    <Link href={`/books/${book._id}`}>
      <img
        src={book.coverImage}
        alt={book.title}
        className="w-full h-60 object-cover rounded mb-4"
      />
    </Link>
    <h4 className="text-lg font-semibold mb-1">{book.title}</h4>
    <p className="text-sm text-gray-600">by {book.author}</p>
    <p className="text-sm text-gray-500 mt-2">{book.description?.slice(0, 100)}...</p>
    <p className="text-sm font-medium text-green-600 mt-2">${book.price?.toFixed(2)}</p>
  </div>
))}
        </div>
        {books.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No books available. Please seed the database.</p>
        )}
      </section> */}
      <BookShowcase/>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-gray-700">

          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold text-blue-700 mb-2">📚 Library System</h2>
            <p className="text-sm">
              A digital platform to manage, search, and borrow books for students, staff, and administrators.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/login" className="hover:underline">Login</Link></li>
              <li><Link href="/Signup" className="hover:underline">Sign Up</Link></li>
              <li><Link href="/about" className="hover:underline">About Us</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/support" className="hover:underline">Support</a></li>
              <li><a href="/terms-of-service" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <p className="text-sm">
              📍 123 Library Street, Knowledge City<br />
              📧 demo@gmail.com<br />
              📞 +1 (234) 567-8901
            </p>
          </div>
        </div>

        <div className="bg-gray-100 text-center py-4 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Library Management System. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
