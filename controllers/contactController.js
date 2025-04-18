const Contact = require('../models/Contact');
const User = require('../models/User');

// Send a contact request
const sendRequest = async (req, h) => {
  const { receiverId } = req.payload;
  const senderId = req.auth.user._id;

  if (senderId === receiverId) {
    return h.response({ message: "You can't add yourself as a contact" }).code(400);
  }

  // Check if the request already exists
  const existingRequest = await Contact.findOne({
    sender: senderId,
    receiver: receiverId
  });
  if (existingRequest) {
    return h.response({ message: "Request already sent" }).code(400);
  }

  const contact = new Contact({ sender: senderId, receiver: receiverId });
  await contact.save();
  return h.response({ message: "Contact request sent" }).code(201);
};

// Accept a contact request
const acceptRequest = async (req, h) => {
  const { contactId } = req.payload;
  const userId = req.auth.user._id;

  const contact = await Contact.findById(contactId);
  if (!contact || contact.receiver.toString() !== userId || contact.status === 'accepted') {
    return h.response({ message: "Invalid contact request" }).code(400);
  }

  contact.status = 'accepted';
  await contact.save();
  return h.response({ message: "Contact request accepted" }).code(200);
};

// Get list of accepted contacts
const listContacts = async (req, h) => {
  const userId = req.auth.user._id;
  const contacts = await Contact.find({
    $or: [
      { sender: userId, status: 'accepted' },
      { receiver: userId, status: 'accepted' }
    ]}).populate('sender receiver', 'name email');

  
  return h.response(contacts).code(200);
};

module.exports = { sendRequest, acceptRequest, listContacts };
