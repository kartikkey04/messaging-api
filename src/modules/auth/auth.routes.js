const AuthController = require('./auth.controller');
const Joi = require('joi'); 
const { verifyToken } = require('../../middlewares/authMiddleware'); 

module.exports = [
  {
    method: 'POST',
    path: '/auth/register',
    options: {
      tags: ['api', 'Auth'],
      description: 'Register a new user',
      notes: 'Creates a user account',
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          name: Joi.string().required(),
          password: Joi.string().min(6).required(),
        }),
      },
      handler: AuthController.register,
    },
  },
  {
    method: 'POST',
    path: '/auth/login',
    options: {
      tags: ['api', 'Auth'],
      description: 'Login user',
      notes: 'Authenticate and return JWT',
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        }),
      },
      handler: AuthController.login,
    },
  },
  {
    method: 'GET',
    path: '/users/me',
    options: {
      tags: ['api', 'User'],
      description: 'Get current user profile',
      notes: 'Requires JWT',
      pre: [{ method: verifyToken }], 
      handler: AuthController.getMe,
    },
  }
];
