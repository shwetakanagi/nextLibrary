const jwt = require('jsonwebtoken');
const User = require('../model/User');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if header is missing or doesn't start with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token part

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'User not found for this token' });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token', error: err.message });
  }
};

module.exports = auth;
