const Message = require('../models/Message');
const Contact = require('../models/Contact');

exports.sendMessage = async (request, h) => {
  try {
    const { receiverId, message } = request.payload;
    const senderId = request.auth.credentials.id;

    // Check if the receiver is a contact
    const contact = await Contact.findOne({
      $or: [
        { sender: senderId, receiver: receiverId, status: 'accepted' },
        { sender: receiverId, receiver: senderId, status: 'accepted' }
      ]
    });

    if (!contact) {
      return h.response({ message: 'You can only message accepted contacts' }).code(400);
    }

    // Create and save the message
    const newMessage = new Message({ sender: senderId, receiver: receiverId, content: message });
    await newMessage.save();

    return h.response({ message: 'Message sent successfully' }).code(201);
  } catch (error) {
    return h.response({ message: 'Failed to send message', error }).code(500);
  }
};

exports.getMessages = async (request, h) => {
  try {
    const contactId = request.params.contactId;
    const userId = request.auth.credentials.id;

    const contact = await Contact.findOne({
      $or: [
        { sender: userId, receiver: contactId, status: 'accepted' },
        { sender: contactId, receiver: userId, status: 'accepted' }
      ]
    });

    if (!contact) {
      return h.response({ message: 'No contact found' }).code(404);
    }

    const { page = 1, limit = 10 } = request.query;
    const skip = (page - 1) * limit;

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: contactId },
        { sender: contactId, receiver: userId }
      ]
    })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: 1 })
      .populate('sender receiver', 'name email');

    return h.response(messages).code(200);
  } catch (error) {
    return h.response({ message: 'Failed to fetch messages', error }).code(500);
  }
};
