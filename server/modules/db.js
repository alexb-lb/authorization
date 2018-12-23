const Sequelize = require('sequelize');

// plug in the promise library:
Sequelize.Promise = global.Promise;

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_URI,
  dialect: process.env.DB_DIALECT,
  logging: false,
  returning: true,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  operatorsAliases: false
});

module.exports = db;