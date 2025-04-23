const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

exports.register = async (request, h) => {
  try {
    const { name, email, password } = request.payload;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn(`Register failed: Email already in use - ${email}`);
      return h.response({ message: 'Email already in use' }).code(400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    logger.info(`New user registered: ${email}`);
    return h.response({ message: 'User registered successfully' }).code(201);
  } catch (err) {
    logger.error(`Register error: ${err.message}`);
    return h.response({ message: 'Server error' }).code(500);
  }
};

exports.login = async (request, h) => {
  try {
    const { email, password } = request.payload;

    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`Login failed: Invalid email - ${email}`);
      return h.response({ message: 'Invalid credentials' }).code(401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Login failed: Invalid password for email - ${email}`);
      return h.response({ message: 'Invalid credentials' }).code(401);
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    logger.info(`Login successful: ${email}`);
    return h.response({ token }).code(200);
  } catch (err) {
    logger.error(`Login error: ${err.message}`);
    return h.response({ message: 'Server error' }).code(500);
  }
};
