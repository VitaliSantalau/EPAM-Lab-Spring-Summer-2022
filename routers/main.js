const express = require('express');
const router = express.Router();

const usersRouter = require('./users');

router.use('/users', usersRouter);

router.get('/', (req, res) => {
  res.status(200).send('api server is working');
});

router.all('*', (req, res) => {
  res.status(404).send('Ooops, something is wrong. You should check the route.');
})

module.exports = router;
