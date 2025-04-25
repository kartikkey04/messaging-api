const Hapi = require('@hapi/hapi');
const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/users/user.routes');
const contactRoutes = require('./modules/contacts/contact.routes');
const messageRoutes = require('./modules/messages/message.routes');
const rateLimit = require('hapi-rate-limit');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package.json');

await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'Messaging API Documentation',
          version: Pack.version,
        },
        grouping: 'tags',
      },
    },
    {
      plugin: rateLimit,
      options: {
        userLimit: 100,
        pathLimit: {
          '/messages': {
            method: 'post',
            limit: 5,
            duration: 60 * 1000,
          },
        },
        trustProxy: true,
      },
    },
  ]);
  
const createServer = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
    routes: { cors: true },
  });

  server.route([...authRoutes, ...userRoutes, ...contactRoutes, ...messageRoutes]);

  return server;
};

module.exports = createServer();
