const {
    sendRequest,
    acceptRequest,
    getAcceptedContacts,
  } = require('./contact.service');
  
  const sendContactRequestHandler = async (request, h) => {
    const senderId = request.auth.user._id;
    const { receiverId } = request.payload;
  
    const contact = await sendRequest(senderId, receiverId);
    return h.response({ message: 'Contact request sent', contact });
  };
  
  const acceptContactRequestHandler = async (request, h) => {
    const receiverId = request.auth.user._id;
    const { senderId } = request.payload;
  
    const contact = await acceptRequest(senderId, receiverId);
    return h.response({ message: 'Contact request accepted', contact });
  };
  
  const getContactsHandler = async (request, h) => {
    const userId = request.auth.user._id;
  
    const contacts = await getAcceptedContacts(userId);
    return h.response({ contacts });
  };
  
  module.exports = {
    sendContactRequestHandler,
    acceptContactRequestHandler,
    getContactsHandler,
  };
  