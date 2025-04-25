const jwt = require('jsonwebtoken');
const { register, login } = require('./auth.service');

const registerHandler = async (request, h) => {
  const { name, email, password } = request.payload;
  const user = await register(name, email, password);
  return h.response({ message: 'User registered', user }).code(201);
};

const loginHandler = async (request, h) => {
  const { email, password } = request.payload;
  const user = await login(email, password);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  return h.response({ token });
};

module.exports = { registerHandler, loginHandler };
