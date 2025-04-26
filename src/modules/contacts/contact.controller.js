const Contact = require('../../models/contact.model');
const User = require('../../models/user.model');
const { logger } = require('../../config/logger');

const sendRequest = async (request, h) => {
  try {
    const { receiverId } = request.payload;
    const senderId = request.user.userId;

    // Check if the receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return h.response({ message: 'Receiver not found' }).code(404);
    }

    // Check if the contact request already exists
    const existingRequest = await Contact.findOne({
      sender: senderId,
      receiver: receiverId,
      status: 'pending',
    });
    if (existingRequest) {
      return h.response({ message: 'Contact request already sent' }).code(400);
    }

    // Create a new contact request
    const contactRequest = new Contact({
      sender: senderId,
      receiver: receiverId,
      status: 'pending',
    });
    await contactRequest.save();

    logger.info(`Contact request sent from ${senderId} to ${receiverId}`);
    return h.response({ message: 'Contact request sent' }).code(201);
  } catch (err) {
    logger.error('Error sending contact request:', err);
    return h.response({ message: 'Internal Server Error' }).code(500);
  }
};

const acceptRequest = async (request, h) => {
  try {
    const { contactId } = request.payload;
    const userId = request.user.userId;

    // Find the contact request
    const contactRequest = await Contact.findById(contactId);
    if (!contactRequest) {
      return h.response({ message: 'Contact request not found' }).code(404);
    }

    // Check if the user is the receiver and the request is pending
    if (contactRequest.receiver.toString() !== userId || contactRequest.status !== 'pending') {
      return h.response({ message: 'Invalid request' }).code(400);
    }

    // Accept the request
    contactRequest.status = 'accepted';
    await contactRequest.save();

    logger.info(`Contact request accepted: ${contactId}`);
    return h.response({ message: 'Contact request accepted' }).code(200);
  } catch (err) {
    logger.error('Error accepting contact request:', err);
    return h.response({ message: 'Internal Server Error' }).code(500);
  }
};

const getContacts = async (request, h) => {
  try {
    const userId = request.user.userId;

    // Find all accepted contacts
    const contacts = await Contact.find({
      $or: [{ sender: userId }, { receiver: userId }],
      status: 'accepted',
    }).populate('sender receiver', 'name email'); // Populate sender and receiver details

    return h.response({ contacts }).code(200);
  } catch (err) {
    logger.error('Error retrieving contacts:', err);
    return h.response({ message: 'Internal Server Error' }).code(500);
  }
};

module.exports = { sendRequest, acceptRequest, getContacts };
