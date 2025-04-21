const User = require('../models/User');

exports.getProfile = async (request, h) => {
  try {
    const userId = request.auth.credentials._id;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return h.response({ message: 'User not found' }).code(404);
    }
    return h.response(user).code(200);
  } catch (err) {
    console.error('Error in getProfile:', err.message);
    return h.response({ message: 'Internal server error' }).code(500);
  }
};
