const jwt = require('jsonwebtoken');
const Boom = require('@hapi/boom');

module.exports = async (request, h) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw Boom.unauthorized('Missing or invalid token');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    request.auth = {
      credentials: {
        _id: decoded._id,
        email: decoded.email
      }
    };

    return h.continue;
  } catch (err) {
    throw Boom.unauthorized('Invalid or expired token');
  }
};
