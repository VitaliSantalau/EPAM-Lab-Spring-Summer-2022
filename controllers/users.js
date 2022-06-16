const data = require('../data/users');

const controller = {
  getUsers: (req, res) => {
    res.status(200).json(data);
  }
}

module.exports = controller;
