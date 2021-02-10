const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const { Task } = require('./task');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
});

User.hasMany(Task);

module.exports = {
  User,
};
