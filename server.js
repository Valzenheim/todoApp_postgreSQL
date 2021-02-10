require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const userModel = require('./models/user');
const taskModel = require('./models/task');
const routes = require('./routes/routes');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use('/api', routes);

const start = async () => {
  try {
    await sequelize.authenticate();

    await sequelize.sync();

    app.listen(PORT, () => console.log(`Server has been started on ${PORT}`));
  } catch (e) {
    console.log('@@@@@@@ error:', e.message);
  }
};
start();
