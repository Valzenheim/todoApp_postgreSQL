const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});

module.exports = { User };
