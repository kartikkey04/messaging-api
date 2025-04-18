const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Boom = require('@hapi/boom');

const authMiddleware = async (request, h) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw Boom.unauthorized('Missing or invalid token');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) throw Boom.unauthorized('User not found');

    request.auth = { user };
    return h.continue;
  } catch (err) {
    throw Boom.unauthorized('Invalid or expired token');
  }
};

module.exports = authMiddleware;
