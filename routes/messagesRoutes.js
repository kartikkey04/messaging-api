const Joi = require('joi');
const messageController = require('../controllers/messageController');
const messageLimiter = require('../middlewares/rateLimiter');

const routes = (server) => {
  server.route([
    {
      method: 'POST',
      path: '/messages',
      options: {
        auth: 'jwt',
        validate: {
          payload: Joi.object({
            receiverId: Joi.string().required(),
            message: Joi.string().min(1).required(),
          }),
        },
        handler: messageController.sendMessage,
        config: {
          validate: { payload: Joi.object({ message: Joi.string().min(1).required() }) },
          pre: [messageLimiter], // Apply rate limit middleware
        },
      },
    },
    {
      method: 'GET',
      path: '/messages/{contactId}',
      options: {
        auth: 'jwt',
        handler: messageController.getMessages,
      },
    },
  ]);
};

module.exports = routes;
