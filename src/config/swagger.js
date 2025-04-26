const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Package = require('../../package.json');

module.exports = [
  Inert,
  Vision,
  {
    plugin: HapiSwagger,
    options: {
      info: {
        title: 'Messaging API Documentation',
        version: Package.version,
      },
      grouping: 'tags',
      documentationPath: '/docs',
    }
  }
];
