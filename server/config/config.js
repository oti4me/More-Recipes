const dotenv = require('dotenv');

dotenv.config();

const config = {
  "development": {
    "username": process.env.DEV_DB_USERNAME,
    "password": process.env.DEV_DB_PASSWORD,
    "database": process.env.DEV_DB_NAME,
    "host": process.env.DEV_DB_HOST,
    "dialect": 'postgres',
    "logging": false
  },
  test: {
    "username": process.env.DEV_DB_USERNAME,
    "password": process.env.DEV_DB_PASSWORD,
    "database": process.env.DEV_DB_NAME,
    "host": process.env.DEV_DB_HOST,
    "dialect": 'postgres',
    "logging": false
    // use_env_variable: 'ELEPHANT_TEST',
    // "dialect": 'postgres',
    // "logging": false,
  },
  production: {
    use_env_variable: 'ELEPHANT',
    "dialect": 'postgres',
    "logging": false
  }
};

module.exports = config;
