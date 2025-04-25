const Joi = require('joi');
const { registerHandler, loginHandler } = require('./auth.controller');

const authRoutes = [
  {
    method: 'POST',
    path: '/auth/register',
    handler: registerHandler,
    options: {
      tags: ['api', 'auth'],
      description: 'Register a new user',
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required(),
        }),
      },
    },
  },
  {
    method: 'POST',
    path: '/auth/login',
    handler: loginHandler,
    options: {
      tags: ['api', 'auth'],
      description: 'Login and return JWT token',
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        }),
      },
    },
  },
];

module.exports = authRoutes;
