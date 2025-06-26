// components/BookShowcase.jsx

import Image from 'next/image';

const books = [
  {
    id: 1,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    description:
      'A handbook of agile software craftsmanship, emphasizing writing clean, maintainable code.',
    price: 25.99,
    coverImage:
      'https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg',
  },
  {
    id: 2,
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    description:
      'An in-depth look at the core features of JavaScript that make it a powerful language.',
    price: 18.5,
    coverImage:
      'https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL.jpg',
  },
  {
    id: 3,
    title: 'You Don’t Know JS (Book Series)',
    author: 'Kyle Simpson',
    description:
      'A deep dive into JavaScript’s core mechanisms and features for intermediate and advanced developers.',
    price: 29.99,
    coverImage:
      'https://images-eu.ssl-images-amazon.com/images/I/7186YfjgHHL._AC_UL210_SR210,210_.jpg',
  },
];

const BookShowcase = () => {
  return (
    <div className="space-y-20 py-10 px-4 md:px-16 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Available Books</h2>

      {books.map((book, index) => (
        <div
          key={book.id}
          className={`flex flex-col md:flex-row ${
            index % 2 !== 0 ? 'md:flex-row-reverse' : ''
          } items-center gap-10`}
        >
          {/* Image */}
          <div className="w-full md:w-1/3">
            <Image
              src={book.coverImage}
              alt={book.title}
              width={400}
              height={300}
              className="rounded-lg shadow-md object-cover w-full h-auto"
            />
          </div>

          {/* Info */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{book.title}</h3>
            <p className="text-sm text-gray-600 mb-1">by {book.author}</p>
            <p className="text-gray-700 mb-4">{book.description.slice(0, 150)}...</p>
           
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookShowcase;
