'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database')[env];
let connection;
if (config.use_env_variable) {
  connection = new Sequelize(process.env[config.use_env_variable], config);
} else {
  connection = new Sequelize(config.database, config.username, config.password, config);
}

module.exports = connection;