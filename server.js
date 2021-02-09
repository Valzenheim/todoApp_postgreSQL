require('dotenv').config();
const express = require('express');
const Sequelize = require('sequelize');

const PORT = process.env.PORT || 8080;

const app = express();

app.listen(PORT, () => console.log(`Server has been started on ${PORT}`));
