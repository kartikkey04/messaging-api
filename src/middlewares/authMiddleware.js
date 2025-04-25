const { verifyToken } = require('../utils/jwt');
const User = require('../modules/auth/auth.model');

const authMiddleware = async (request, h) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Missing or invalid token');
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) throw new Error('User not found');

    request.auth = { user };
    return h.continue;
  } catch (err) {
    return h
      .response({ message: 'Unauthorized', error: err.message })
      .code(401)
      .takeover();
  }
};

module.exports = authMiddleware;
