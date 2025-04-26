const jwt = require('jsonwebtoken');
const { logger } = require('../config/logger');

const verifyToken = async (request, h) => {
  const token = request.headers['authorization']?.split(' ')[1];

  if (!token) {
    return h.response({ message: 'Token is required' }).code(403);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = { userId: decoded.userId }; // Add user ID to the request object
    return h.continue;
  } catch (err) {
    logger.error('Error verifying token:', err);
    return h.response({ message: 'Invalid or expired token' }).code(403);
  }
};

module.exports = { verifyToken };
