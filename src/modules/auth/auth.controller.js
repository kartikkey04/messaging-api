const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model'); 
const { logger } = require('../../config/logger');

const register = async (request, h) => {
  try {
    const { email, name, password } = request.payload;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return h.response({ message: 'User already exists' }).code(400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, name, password: hashedPassword });
    await user.save();

    logger.info(`New user registered: ${email}`);
    return h.response({ message: 'User registered successfully' }).code(201);

  } catch (err) {
    logger.error('Registration error:', err);
    return h.response({ message: 'Internal Server Error' }).code(500);
  }
};

const login = async (request, h) => {
  try {
    const { email, password } = request.payload;

    const user = await User.findOne({ email });
    if (!user) {
      return h.response({ message: 'Invalid credentials' }).code(401);
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return h.response({ message: 'Invalid credentials' }).code(401);
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    logger.info(`User logged in: ${email}`);
    return h.response({ token }).code(200);

  } catch (err) {
    logger.error('Login error:', err);
    return h.response({ message: 'Internal Server Error' }).code(500);
  }
};

const getMe = async (request, h) => {
  try {
    const user = request.user; 
    return h.response({ user }).code(200);
  } catch (err) {
    logger.error('GetMe error:', err);
    return h.response({ message: 'Internal Server Error' }).code(500);
  }
};

module.exports = { register, login, getMe };
