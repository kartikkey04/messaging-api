const { registerHandler, loginHandler } = require('./auth.controller');

const authRoutes = [
  {
    method: 'POST',
    path: '/auth/register',
    handler: registerHandler,
  },
  {
    method: 'POST',
    path: '/auth/login',
    handler: loginHandler,
  },
];

module.exports = authRoutes;
