const Joi = require('joi');
const { register, login } = require('../controllers/authController');

module.exports = [
  {
    method: 'POST',
    path: '/auth/register',
    handler: register,
    options: {
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
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required()
        })
      }
    }
  }
];
