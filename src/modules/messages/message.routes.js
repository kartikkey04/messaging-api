const MessageController = require('./message.controller');
const Joi = require('joi'); // For input validation
const { verifyToken } = require('../../middlewares/authMiddleware'); // Optional for protected routes

module.exports = [
  {
    method: 'POST',
    path: '/messages',
    options: {
      tags: ['api', 'Message'],
      description: 'Send a message to a contact',
      notes: 'Requires JWT authentication',
      validate: {
        payload: Joi.object({
          receiverId: Joi.string().required(),
          message: Joi.string().required(),
        }),
      },
      pre: [{ method: verifyToken }], 
      handler: MessageController.sendMessage,
    },
  },
  {
    method: 'GET',
    path: '/messages/{contactId}',
    options: {
      tags: ['api', 'Message'],
      description: 'Get messages with a contact',
      notes: 'Paginated messages between two users',
      validate: {
        params: Joi.object({
          contactId: Joi.string().required(),
        }),
        query: Joi.object({
          page: Joi.number().default(1),
          limit: Joi.number().default(10),
        }),
      },
      pre: [{ method: verifyToken }], 
      handler: MessageController.getMessages,
    },
  }
];
