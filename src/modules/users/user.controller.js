const User = require('../../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { logger } = require('../../config/logger');

const registerUser = async (request, h) => {
  try {
    const { name, email, password } = request.payload;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return h.response({ message: 'User already exists' }).code(400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    logger.info(`User registered with email: ${email}`);
    return h.response({ message: 'User registered successfully' }).code(201);
  } catch (err) {
    logger.error('Error registering user:', err);
    return h.response({ message: 'Internal Server Error' }).code(500);
  }
};

const loginUser = async (request, h) => {
  try {
    const { email, password } = request.payload;

    const user = await User.findOne({ email });
    if (!user) {
      return h.response({ message: 'Invalid credentials' }).code(400);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return h.response({ message: 'Invalid credentials' }).code(400);
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    logger.info(`User logged in with email: ${email}`);
    return h.response({ token }).code(200);
  } catch (err) {
    logger.error('Error logging in user:', err);
    return h.response({ message: 'Internal Server Error' }).code(500);
  }
};

const getUserProfile = async (request, h) => {
  try {
    const userId = request.user.userId;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return h.response({ message: 'User not found' }).code(404);
    }

    return h.response({ user }).code(200);
  } catch (err) {
    logger.error('Error fetching user profile:', err);
    return h.response({ message: 'Internal Server Error' }).code(500);
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
