const { getProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

module.exports = [
  {
    method: 'GET',
    path: '/users/me',
    handler: getProfile,
    options: {
      pre: [authMiddleware]
    }
  }
];
