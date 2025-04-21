const User = require('../models/User');
const Contact = require('../models/Contact');

exports.sendRequest = async (request, h) => {
  try {
    const senderId = request.auth.credentials._id; 
    const { receiverId } = request.payload;

    if (senderId === receiverId) {
      return h.response({ message: "You can't send a request to yourself" }).code(400);
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return h.response({ message: 'Receiver not found' }).code(404);
    }

    const existing = await Contact.findOne({
      sender: senderId,
      receiver: receiverId,
    });

    if (existing) {
      return h.response({ message: 'Request already exists' }).code(400);
    }

    const contact = new Contact({
      sender: senderId,
      receiver: receiverId,
      status: 'pending',
    });

    await contact.save();

    return h.response({ message: 'Contact request sent' }).code(201);

  } catch (err) {
    console.error('Contact Request Error:', err.message);
    return h.response({ message: 'Server error' }).code(500);
  }

  
};

exports.acceptRequest = async (request, h) => {
  try {
    const receiverId = request.auth.credentials._id;
    const { senderId } = request.payload;

    const contact = await Contact.findOne({ sender: senderId, receiver: receiverId, status: 'pending' });

    if (!contact) {
      return h.response({ message: 'No pending contact request found' }).code(404);
    }

    contact.status = 'accepted';
    await contact.save();

    return h.response({ message: 'Contact request accepted' }).code(200);
  } catch (err) {
    console.error('Accept Contact Error:', err.message);
    return h.response({ message: 'Server error' }).code(500);
  }
};

exports.listContacts = async (req, h) => {
  const userId = req.auth.user._id;
  const contacts = await Contact.find({
    $or: [
      { sender: userId, status: 'accepted' },
      { receiver: userId, status: 'accepted' }
    ]}).populate('sender receiver', 'name email');

  
  return h.response(contacts).code(200);
};
