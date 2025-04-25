const { getProfileHandler } = require('./user.controller');
const authMiddleware = require('../../middlewares/authMiddleware');

const userRoutes = [
  {
    method: 'GET',
    path: '/users/me',
    handler: getProfileHandler,
    options: {
      tags: ['api', 'users'],
      description: 'Get logged-in user profile',
      pre: [{ method: authMiddleware }],
    },
  },
];

module.exports = userRoutes;
