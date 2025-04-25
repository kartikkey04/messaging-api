const { getMeHandler } = require('./user.controller');
const authMiddleware = require('../../middlewares/authMiddleware');

const userRoutes = [
  {
    method: 'GET',
    path: '/users/me',
    handler: getMeHandler,
    options: {
      pre: [{ method: authMiddleware }],
    },
  },
];

module.exports = userRoutes;
