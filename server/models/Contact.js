const Sequelize = require('sequelize');
const db = require('../modules/db');

const Contact = db.define('contact', {
  name: {
    type: Sequelize.STRING,
    notEmpty: true,
    notNull: true,
    validate: {
      min: 1,
      notSpace(value) {
        if (!value.trim().length) {
          throw new Error('Name is invalid')
        }
      }
    },
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    notNull: true,
    notEmpty: true,
    isEmail: true,
  },
  phone: {
    type: Sequelize.STRING,
    defaultValue: '',
  },
  debt: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  notes: {
    type: Sequelize.STRING,
    defaultValue: '',
  },
}, {timestamps: false});

module.exports = Contact;
