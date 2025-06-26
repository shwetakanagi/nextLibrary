require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('../backend/model/Book');

const MONGO_URI = process.env.MONGO_URI;

const books = [
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Programming',
    coverImage: 'https://m.media-amazon.com/images/I/41jEbK-jG+L._SX374_BO1,204,203,200_.jpg',
    description: 'A Handbook of Agile Software Craftsmanship. Learn how to write clean, maintainable code.',
    price: 29.99
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Self-Help',
    coverImage: 'https://m.media-amazon.com/images/I/91bYsX41DVL.jpg',
    description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones.',
    price: 17.99
  },
  {
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt & David Thomas',
    category: 'Software Engineering',
    coverImage: 'https://m.media-amazon.com/images/I/518FqJvR9aL.jpg',
    description: 'Your Journey to Mastery - from journeyman to expert software developer.',
    price: 35.00
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    category: 'Fiction',
    coverImage: 'https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg',
    description: 'A philosophical book that inspires readers to follow their dreams and purpose.',
    price: 14.99
  },
  {
    title: 'Deep Work',
    author: 'Cal Newport',
    category: 'Productivity',
    coverImage: 'https://backendtea.com/post/what-ive-been-reading-deep-work/featured_hu4407692966026589337.webp',
    description: 'Rules for focused success in a distracted world.',
    price: 22.50
  },
   {
    title: 'Fundamentals of Software Architecture',
    author: 'Mark Richards & Neal Ford',
    category: 'Software Architecture',
    coverImage: 'https://www.oreilly.com/library/cover/9781492043447/1200w630h/',
    description: 'A comprehensive guide to software architecture practices, trade-offs, and patterns.',
    price: 42.00
  },
  {
    title: 'Grokking Algorithms',
    author: 'Aditya Bhargava',
    category: 'Algorithms',
    coverImage: 'https://images-na.ssl-images-amazon.com/images/I/61u0y9ADElL._SX397_BO1,204,203,200_.jpg',
    description: 'A friendly illustrated guide to algorithms, perfect for beginners.',
    price: 39.95
  },
  {
    title: 'The Phoenix Project',
    author: 'Gene Kim, Kevin Behr, George Spafford',
    category: 'DevOps',
    coverImage: 'https://static-ppimages.freetls.fastly.net/nielsens/9781950508945.jpg?canvas=363,600&fit=bounds&height=600&mode=max&width=363&404=default.jpg',
    description: 'A novel about IT, DevOps, and helping your business win.',
    price: 30.00
  },
  {
    title: 'Continuous Delivery',
    author: 'Jez Humble & David Farley',
    category: 'DevOps',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoZ0MuEin4y7cQbTHdIahnTrQkq2USaZsM6g&s',
    description: 'Reliable software releases through build, test, and deployment automation.',
    price: 47.95
  },
  {
    title: 'Code: The Hidden Language of Computer Hardware and Software',
    author: 'Charles Petzold',
    category: 'Computer Science',
    coverImage: 'https://images-na.ssl-images-amazon.com/images/I/61Hc-9h+-XL._AC_UL210_SR210,210_.jpg',
    description: 'An accessible dive into the history and logic of computing systems.',
    price: 34.99
  },
  {
    title: 'Linux Basics for Hackers',
    author: 'OccupyTheWeb',
    category: 'Cybersecurity',
    coverImage: 'https://target.scene7.com/is/image/Target/GUEST_bd12bb16-1d44-405b-a497-614e96b3e6b2',
    description: 'Learn Linux from a hacker’s perspective, from command line to scripting.',
    price: 24.95
  },
  {
    title: 'Python Crash Course',
    author: 'Eric Matthes',
    category: 'Programming',
    coverImage: 'https://m.media-amazon.com/images/I/71pys4B4OVL._UF1000,1000_QL80_.jpg',
    description: 'A hands-on, project-based introduction to Python.',
    price: 38.50
  },
  {
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    category: 'Data Engineering',
    coverImage: 'https://www.oreilly.com/library/cover/9781491903063/1200w630h/',
    description: 'Big ideas behind scalable, fault-tolerant, and maintainable systems.',
    price: 49.95
  },
  {
    title: 'The Art of Scalability',
    author: 'Martin L. Abbott & Michael T. Fisher',
    category: 'System Design',
    coverImage: 'https://www.oreilly.com/library/cover/9780134031408/1200w630h/',
    description: 'Scalable web architectures, processes, and organizations for the real world.',
    price: 46.00
  },
  {
    title: 'Head First Design Patterns',
    author: 'Eric Freeman & Elisabeth Robson',
    category: 'Software Design',
    coverImage: 'https://images-na.ssl-images-amazon.com/images/I/518FqJvR9aL._SX376_BO1,204,203,200_.jpg',
    description: 'A brain‑friendly guide to the most important design patterns in object‑oriented design.',
    price: 44.99
  }
];

async function seedBooks() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Book.deleteMany(); // Clear existing books
    const created = await Book.insertMany(books);

    console.log(`📚 Seeded ${created.length} books`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding books:', error.message);
    process.exit(1);
  }
}

seedBooks();
