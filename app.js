const express = require('express');
const bodyParser = require('body-parser');

const router = require('./routers/main');

const app = express();
app.use(bodyParser.json());

app.use('/api', router);

module.exports = app;
