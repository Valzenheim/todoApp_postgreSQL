const { Sequelize } = require('sequelize');

sequelize = new Sequelize(`${process.env.DB_URI}?sslmode=require`, {
  url: process.env.DB_URI,
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
