const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, h) => {
  const { email, name, password } = req.payload;

  const existing = await User.findOne({ email });
  if (existing) return h.response({ message: 'Email already registered' }).code(400);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ email, name, password: hashedPassword });
  await user.save();

  return h.response({ message: 'User registered successfully' }).code(201);
};

const login = async (req, h) => {
  const { email, password } = req.payload;

  const user = await User.findOne({ email });
  if (!user) return h.response({ message: 'Invalid credentials' }).code(401);

  const match = await bcrypt.compare(password, user.password);
  if (!match) return h.response({ message: 'Invalid credentials' }).code(401);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return h.response({ token }).code(200);
};

module.exports = { register, login };
