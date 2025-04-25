require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const startServer = async () => {
  await connectDB();

  await app.start();
  console.log(`Server running at: ${app.info.uri}`);
};

startServer();
