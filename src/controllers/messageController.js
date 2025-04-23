const Message = require('../models/message');
const Contact = require('../models/Contact');
const logger = require('../utils/logger');

exports.sendMessage = async (request, h) => {
  try {
    const senderId = request.user._id;
    const { receiverId, message } = request.payload;

    const contact = await Contact.findOne({
      $or: [
        { sender: senderId, receiver: receiverId, status: 'accepted' },
        { sender: receiverId, receiver: senderId, status: 'accepted' }
      ]
    });

    if (!contact) {
      logger.warn(`Unauthorized message attempt from ${senderId} to ${receiverId}`);
      return h.response({ message: 'You can only message accepted contacts' }).code(403);
    }

    const newMessage = new Message({ sender: senderId, receiver: receiverId, message });
    await newMessage.save();

    logger.info(`Message sent from ${senderId} to ${receiverId}`);
    return h.response({ message: 'Message sent successfully' }).code(201);
  } catch (err) {
    logger.error(`Message sending error: ${err.message}`);
    return h.response({ message: 'Server error' }).code(500);
  }
};

exports.getMessages = async (request, h) => {
  try {
    const userId = request.user._id;
    const { contactId } = request.params;
    const { page = 1, limit = 10 } = request.query;

    const skip = (page - 1) * limit;

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: contactId },
        { sender: contactId, receiver: userId }
      ]
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    logger.info(`Fetched messages between ${userId} and ${contactId} - Page: ${page}`);

    return h.response({ messages }).code(200);
  } catch (err) {
    logger.error(`Failed to get messages: ${err.message}`);
    return h.response({ message: 'Server error' }).code(500);
  }
};
