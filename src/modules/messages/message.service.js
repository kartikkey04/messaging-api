const Message = require('./message.model');
const Contact = require('../contacts/contact.model');

const canMessage = async (userId, receiverId) => {
  const contact = await Contact.findOne({
    $or: [
      { sender: userId, receiver: receiverId },
      { sender: receiverId, receiver: userId },
    ],
    status: 'accepted',
  });
  return !!contact;
};

const sendMessage = async (senderId, receiverId, content) => {
  const allowed = await canMessage(senderId, receiverId);
  if (!allowed) throw new Error('You are not connected with this user.');

  const message = new Message({ sender: senderId, receiver: receiverId, message: content });
  return await message.save();
};

const getMessages = async (userId, contactId, page = 1, limit = 10) => {
  const allowed = await canMessage(userId, contactId);
  if (!allowed) throw new Error('You are not connected with this user.');

  const skip = (page - 1) * limit;
  const messages = await Message.find({
    $or: [
      { sender: userId, receiver: contactId },
      { sender: contactId, receiver: userId },
    ],
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return messages;
};

module.exports = { sendMessage, getMessages };
