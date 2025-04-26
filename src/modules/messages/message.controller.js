const Message = require('../../models/message.model');
const { logger } = require('../../config/logger');
const rateLimit = require('express-rate-limit');
const User = require('../../models/user.model');

// const messageRateLimiter = new rateLimit({
//   windowMs: 60 * 1000, 
//   max: 5, 
//   message: { message: 'You have exceeded the message limit. Try again in a minute.' },
// });

const sendMessage = async (request, h) => {
  try {
    const { receiverId, message } = request.payload;
    const senderId = request.user.userId;

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return h.response({ message: 'Receiver not found' }).code(404);
    }

    if (senderId === receiverId) {
      return h.response({ message: 'You cannot send a message to yourself' }).code(400);
    }

    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      message,
    });
    await newMessage.save();

    logger.info(`Message sent from ${senderId} to ${receiverId}`);
    return h.response({ message: 'Message sent successfully' }).code(201);
  } catch (err) {
    logger.error('Error sending message:', err);
    return h.response({ message: 'Internal Server Error' }).code(500);
  }
};

const getMessages = async (request, h) => {
  try {
    const { contactId } = request.params;
    const { page, limit } = request.query;
    const senderId = request.user.userId;

    const receiver = await User.findById(contactId);
    if (!receiver) {
      return h.response({ message: 'Receiver not found' }).code(404);
    }

    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: contactId },
        { sender: contactId, receiver: senderId },
      ],
    })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 }); 

    return h.response({ messages }).code(200);
  } catch (err) {
    logger.error('Error retrieving messages:', err);
    return h.response({ message: 'Internal Server Error' }).code(500);
  }
};

module.exports = { sendMessage, getMessages };
