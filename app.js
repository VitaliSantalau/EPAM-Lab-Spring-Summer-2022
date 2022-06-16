const express = require('express');
const usersRouter = require('./routers/users');

const app = express();

app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.status(200).send('<h1>Express CRUD server is working</h1>')
})

app.all('*', (req, res) => {
  res.status(404).send('<h2>Ooops, something is wrong, there is nothing to show</h2>')
})

app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});
