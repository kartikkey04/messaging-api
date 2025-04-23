const Joi = require('joi');
const { register, login } = require('../controllers/authController');

module.exports = [
  {
    method: 'POST',
    path: '/auth/register',
    handler: register,
    options: {
      tags: ['api', 'auth'],
      description: 'Register a new user',
      notes: 'Creates a new user with name, email, and password',
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          name: Joi.string().required(),
          password: Joi.string().min(6).required()
        })
      }
    }
  },
  {
    method: 'POST',
    path: '/auth/login',
    handler: login,
    options: {
      tags: ['api', 'auth'],
      description: 'Login user',
      notes: 'Authenticates user and returns JWT token',
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required()
        })
      }
    }
  }
];
