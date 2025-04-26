const UserController = require('./user.controller');
const Joi = require('joi');
const { verifyToken } = require('../../middlewares/authMiddleware'); 

module.exports = [
  {
    method: 'POST',
    path: '/auth/register',
    options: {
      tags: ['api', 'User'],
      description: 'Register a new user',
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required(),
        }),
      },
      handler: UserController.registerUser,
    },
  },
  {
    method: 'POST',
    path: '/auth/login',
    options: {
      tags: ['api', 'User'],
      description: 'Login a user and get JWT',
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        }),
      },
      handler: UserController.loginUser,
    },
  },
  {
    method: 'GET',
    path: '/users/me',
    options: {
      tags: ['api', 'User'],
      description: 'Get the profile of the logged-in user',
      pre: [{ method: verifyToken }], 
      handler: UserController.getUserProfile,
    },
  }
];
