const Joi = require('joi');
const { sendRequest, acceptRequest, listContacts } = require('../controllers/contactController');
const authMiddleware = require('../middlewares/authMiddleware');

module.exports = [
  {
    method: 'POST',
    path: '/contacts/request',
    handler: sendRequest,
    options: {
      tags: ['api', 'contacts'],
      description: 'Send contact request',
      notes: 'Allows a user to send a contact request to another user',
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
      tags: ['api', 'contacts'],
      description: 'Accept contact request',
      notes: 'Accepts a pending contact request from another user',
      pre: [authMiddleware],
      validate: {
        payload: Joi.object({
          senderId: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/contacts',
    handler: listContacts,
    options: {
      tags: ['api', 'contacts'],
      description: 'Get accepted contacts',
      notes: 'Returns a list of all accepted contacts for the logged-in user',
      pre: [authMiddleware]
    }
  }
];
