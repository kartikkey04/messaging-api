const rateLimit = require('express-rate-limit');

const messageLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5, 
  message: 'You can send only 5 messages per minute',
});

module.exports = messageLimiter;
