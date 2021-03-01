const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Task = sequelize.define('Tasks', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  taskName: {
    type: DataTypes.STRING,
  },
  done: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  ownerId: {
    type: DataTypes.INTEGER,
  },
});

module.exports = { Task };
