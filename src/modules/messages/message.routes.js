const Joi = require('joi');
const {
  sendMessageHandler,
  getMessagesHandler,
} = require('./message.controller');
const authMiddleware = require('../../middlewares/authMiddleware');

const messageRoutes = [
  {
    method: 'POST',
    path: '/messages',
    handler: sendMessageHandler,
    options: {
      tags: ['api', 'messages'],
      description: 'Send a message to a contact (must be connected)',
      pre: [{ method: authMiddleware }],
      validate: {
        payload: Joi.object({
          receiverId: Joi.string().required(),
          message: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/messages/{contactId}',
    handler: getMessagesHandler,
    options: {
      tags: ['api', 'messages'],
      description: 'Get paginated messages with a contact',
      pre: [{ method: authMiddleware }],
      validate: {
        params: Joi.object({
          contactId: Joi.string().required(),
        }),
        query: Joi.object({
          page: Joi.number().min(1).default(1),
          limit: Joi.number().min(1).max(100).default(10),
        }),
      },
    },
  },
];

module.exports = messageRoutes;
