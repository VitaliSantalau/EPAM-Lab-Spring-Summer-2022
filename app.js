const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const usersRouter = require('./routers/users');

const app = express();
app.use(bodyParser.json());

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.status(200).send('Express CRUD server is working');
})

app.all('*', (req, res) => {
  res.status(404).send('Ooops, something is wrong');
})

app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});
