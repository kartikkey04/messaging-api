const ContactController = require('./contact.controller');
const Joi = require('joi'); 
const { verifyToken } = require('../../middlewares/authMiddleware');

module.exports = [
  {
    method: 'POST',
    path: '/contacts/request',
    options: {
      tags: ['api', 'Contact'],
      description: 'Send a contact request',
      notes: 'Requires JWT authentication',
      validate: {
        payload: Joi.object({
          receiverId: Joi.string().required(),
        }),
      },
      pre: [{ method: verifyToken }], 
      handler: ContactController.sendRequest,
    },
  },
  {
    method: 'POST',
    path: '/contacts/accept',
    options: {
      tags: ['api', 'Contact'],
      description: 'Accept a contact request',
      notes: 'Requires JWT authentication',
      validate: {
        payload: Joi.object({
          contactId: Joi.string().required(),
        }),
      },
      pre: [{ method: verifyToken }], 
      handler: ContactController.acceptRequest,
    },
  },
  {
    method: 'GET',
    path: '/contacts',
    options: {
      tags: ['api', 'Contact'],
      description: 'Get list of accepted contacts',
      notes: 'Requires JWT authentication',
      pre: [{ method: verifyToken }],
      handler: ContactController.getContacts,
    },
  },
];
