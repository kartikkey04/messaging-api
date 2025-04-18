const Joi = require('joi');
const { sendRequest, acceptRequest, listContacts } = require('../controllers/contactController');
const authMiddleware = require('../middlewares/authMiddleware');

module.exports = [
  {
    method: 'POST',
    path: '/contacts/request',
    handler: sendRequest,
    options: {
      pre: [authMiddleware],
      validate: {
        payload: Joi.object({
          receiverId: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'POST',
    path: '/contacts/accept',
    handler: acceptRequest,
    options: {
      pre: [authMiddleware],
      validate: {
        payload: Joi.object({
          contactId: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/contacts',
    handler: listContacts,
    options: {
      pre: [authMiddleware]
    }
  }
];
