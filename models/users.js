const Sequelize = require('sequelize');
const database = require('../utilities/database');

const User = database.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
},
{
  indexes: [
    { fields: ['email'] },
    { fields: ['username'] },
  ],
});

module.exports = User;
