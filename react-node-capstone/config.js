const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  endpoint: process.env.API_HOST,
  masterKey: process.env.API_USER,
  port: process.env.API_PORT,
  password: process.env.API_PASSWORD,
  database: process.env.API_DATABASE
};