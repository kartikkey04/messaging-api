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
        pre: [{ method: authMiddleware }],
      },
    },
    {
      method: 'GET',
      path: '/messages/{contactId}',
      handler: getMessagesHandler,
      options: {
        pre: [{ method: authMiddleware }],
      },
    },
  ];
  
  module.exports = messageRoutes;
  