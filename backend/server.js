const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/books');
const borrowRoute = require('./routes/Borrow');
const borrowedRoute = require('./routes/borrowed');
const studentNotifications = require('./routes/studentNotifications');
const studentHistory = require('./routes/studentHistory');
const staffBorrowRoutes = require('./routes/staffBorrow');
dotenv.config();

const app = express();
connectDB(); // connect to MongoDB

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', bookRoutes);
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/borrow', borrowRoute);
app.use('/api/borrowed', borrowedRoute);
app.use('/api/student/notifications', studentNotifications);
app.use('/api/student/history', studentHistory);
app.use('/api/staff/borrow-requests', staffBorrowRoutes);
app.use('/api/staff/returns', require('./routes/staffReturns')); // <-- This line
app.use('/api/staff/students', require('./routes/staffStudents'));
app.use('/api/staff/notifications', require('./routes/staffNotifications'));

// Root
app.get('/', (req, res) => {
  res.send('📚 Library Management API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
