require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const routes = require('./routes/routes');
const path = require('path');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.use('/', express.static(__dirname + '/client/build/'));
app.use('/api', routes);

const start = async () => {
  try {
    await sequelize.authenticate();

    app.listen(PORT, () => console.log(`Server has been started on ${PORT}`));
  } catch (e) {
    console.log('@@@@@@@ error:', e.message);
  }
};
start();
