require('dotenv').config();
const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const rateLimit = require('hapi-rate-limit');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const messageRoutes = require('./routes/messagesRoutes');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost'
  });

  // Connect to MongoDB
  await mongoose.connect(process.env.MONGO_URI, {
  });

  await server.register({
    plugin: rateLimit,
    options: {
      userLimit: 5,
      pathLimit: 60 * 1000,
    }
  });

  // Register routes 
  server.route(authRoutes);
  server.route(userRoutes);
  server.route(contactRoutes);
  server.route(messageRoutes);
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
