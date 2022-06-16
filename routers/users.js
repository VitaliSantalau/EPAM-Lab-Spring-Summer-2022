const express = require('express');
const controller = require('../controllers/users');

const router = express.Router();

router.get('/', controller.getUsers);

router.get('/:id', controller.getUser);

module.exports = router;
