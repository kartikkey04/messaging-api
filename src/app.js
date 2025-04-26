const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('./config/logger').logger;
const { verifyToken } = require('./middlewares/authMiddleware');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db')
const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/users/user.routes');
const contactRoutes = require('./modules/contacts/contact.routes');
const messageRoutes = require('./modules/messages/message.routes');
const swaggerPlugin = require('./config/swagger');



dotenv.config();


const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost',
  routes: {
    cors: {
      origin: ['*'], 
    },
  },
});

const init = async () => {
  try {
    connectDB();
    await server.register([
      {
        plugin: require('hapi-rate-limit'),
        options: {
          enabled: true,
          rateLimit: 5, 
          userId: (request) => request.headers['authorization'], 
        },
      },
      {
        plugin: swaggerPlugin,
      },
      {
        plugin: swaggerPlugin,
        options: {
          info: {
            title: 'Messaging API',
            version: '1.0.0',
          },
        },
      },
      {
        plugin: swaggerPlugin,
        options: {
          path: '/documentation',
        },
      },
    ]);

    server.route(authRoutes);
    server.route(userRoutes);
    server.route(contactRoutes);
    server.route(messageRoutes);

    await server.start();
    logger.info(`Server running at: ${server.info.uri}`);
  } catch (err) {
    logger.error('Error starting the server:', err);
    process.exit(1);
  }
};

init();
