require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const userModel = require('./models/user');
const taskModel = require('./models/task');
const routes = require('./routes/routes');
const path = require('path');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use('/api', routes);
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

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
