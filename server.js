require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const routes = require('./routes/routes');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((err, req, res, next) => {
  if (err) console.log(err.message);
  next();
});

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
