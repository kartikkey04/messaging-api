const { sendMessage, getMessages } = require('./message.service');

const sendMessageHandler = async (request, h) => {
  const senderId = request.auth.user._id;
  const { receiverId, message } = request.payload;

  const sent = await sendMessage(senderId, receiverId, message);
  return h.response({ message: 'Message sent', sent });
};

const getMessagesHandler = async (request, h) => {
  const userId = request.auth.user._id;
  const { contactId } = request.params;
  const { page = 1, limit = 10 } = request.query;

  const messages = await getMessages(userId, contactId, parseInt(page), parseInt(limit));
  return h.response({ messages });
};

module.exports = { sendMessageHandler, getMessagesHandler };
