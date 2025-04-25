const Joi = require('joi');
const {
  sendContactRequestHandler,
  acceptContactRequestHandler,
  getContactsHandler,
} = require('./contact.controller');
const authMiddleware = require('../../middlewares/authMiddleware');

const contactRoutes = [
  {
    method: 'POST',
    path: '/contacts/request',
    handler: sendContactRequestHandler,
    options: {
      tags: ['api', 'contacts'],
      description: 'Send a contact request to another user',
      pre: [{ method: authMiddleware }],
      validate: {
        payload: Joi.object({
          receiverId: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'POST',
    path: '/contacts/accept',
    handler: acceptContactRequestHandler,
    options: {
      tags: ['api', 'contacts'],
      description: 'Accept a contact request',
      pre: [{ method: authMiddleware }],
      validate: {
        payload: Joi.object({
          senderId: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/contacts',
    handler: getContactsHandler,
    options: {
      tags: ['api', 'contacts'],
      description: 'List all accepted contacts',
      pre: [{ method: authMiddleware }],
    },
  },
];

module.exports = contactRoutes;
