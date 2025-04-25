const Contact = require('./contact.model');

const sendRequest = async (senderId, receiverId) => {
  const existing = await Contact.findOne({
    sender: senderId,
    receiver: receiverId,
  });
  if (existing) throw new Error('Request already sent or exists');

  const contact = new Contact({ sender: senderId, receiver: receiverId });
  return await contact.save();
};

const acceptRequest = async (senderId, receiverId) => {
  const contact = await Contact.findOne({
    sender: senderId,
    receiver: receiverId,
    status: 'pending',
  });
  if (!contact) throw new Error('No pending request found');

  contact.status = 'accepted';
  return await contact.save();
};

const getAcceptedContacts = async (userId) => {
  return await Contact.find({
    $or: [{ sender: userId }, { receiver: userId }],
    status: 'accepted',
  })
    .populate('sender', 'name email')
    .populate('receiver', 'name email');
};

module.exports = {
  sendRequest,
  acceptRequest,
  getAcceptedContacts,
};
