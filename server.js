require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const klawSync = require('klaw-sync');
const path = require('path');
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

app.use((error, req, res, next) => {
  res.status(error.status);
  console.log('@@@@@@@ error:', error);
  res.json({ message: error.message });
});

async function useControllers() {
  const paths = klawSync(`${__dirname}/routes`, { nodir: true });
  let controllersCount = 0;
  paths.forEach((file) => {
    if (
      path.basename(file.path)[0] === '_' ||
      path.basename(file.path)[0] === '.'
    )
      return;
    app.use('/api', require(file.path));
    controllersCount++;
  });

  console.info(`Total controllers: ${controllersCount}`);
}

const start = async () => {
  try {
    await sequelize.authenticate();

    app.listen(PORT, () => console.log(`Server has been started on ${PORT}`));
  } catch (e) {
    console.log('@@@@@@@ error:', e.message);
  }
};
useControllers();
start();
