const HapiRateLimit = require('hapi-rate-limit');

module.exports = [
  {
    plugin: HapiRateLimit,
    options: {
      userLimit: false,
      trustProxy: true,
      pathLimit: false,
      global: {
        rateLimit: 100, // Max 100 requests
        duration: 60 * 1000, // Per 1 minute
      }
    }
  }
];
