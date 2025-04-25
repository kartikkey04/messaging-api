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
        pre: [{ method: authMiddleware }],
      },
    },
    {
      method: 'POST',
      path: '/contacts/accept',
      handler: acceptContactRequestHandler,
      options: {
        pre: [{ method: authMiddleware }],
      },
    },
    {
      method: 'GET',
      path: '/contacts',
      handler: getContactsHandler,
      options: {
        pre: [{ method: authMiddleware }],
      },
    },
  ];
  
  module.exports = contactRoutes;
  