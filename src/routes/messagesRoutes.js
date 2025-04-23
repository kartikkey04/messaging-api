const Joi = require('joi');
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middlewares/authMiddleware');

module.exports = [
  {
    method: 'POST',
    path: '/messages',
    handler: messageController.sendMessage,
    options: {
      tags: ['api', 'messages'],
      description: 'Send a message',
      notes: 'Sends a message to an accepted contact',
      pre: [{ method: authMiddleware }],
      validate: {
        payload: Joi.object({
          receiverId: Joi.string().required(),
          message: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/messages/{contactId}',
    handler: messageController.getMessages,
    options: {
      tags: ['api', 'messages'],
      description: 'Get messages with a contact',
      notes: 'Returns paginated messages between the logged-in user and a contact',
      pre: [{ method: authMiddleware }],
      validate: {
        params: Joi.object({
          contactId: Joi.string().required()
        }),
        query: Joi.object({
          page: Joi.number().integer().min(1).default(1),
          limit: Joi.number().integer().min(1).max(100).default(10)
        })
      }
    }
  }
];