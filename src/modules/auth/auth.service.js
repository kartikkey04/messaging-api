const User = require('./auth.model');
const bcrypt = require('bcrypt');

const register = async (name, email, password) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error('Email already in use');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  return user;
};

module.exports = { register, login };
