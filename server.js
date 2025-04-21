require('dotenv').config();
const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const rateLimit = require('hapi-rate-limit');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const messageRoutes = require('./routes/messagesRoutes');
const logger = require('./utils/logger');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Package = require('./package.json');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
    routes: {
      cors:{
        origin: ['*'],
      },
    },
  });

  // Connect to MongoDB
  await mongoose.connect(process.env.MONGO_URI, {
  });

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'Messaging API Documentation',
          version: Package.version
        },
        grouping: 'tags'
      }
    }
  ]);

  // await server.register({
  //   plugin: rateLimit,
  //   options: {
  //     userLimit: 5,
  //     pathLimit: 60 * 1000,
  //   }
  // });

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
