const data = require('../model/users');

const controller = {
  getUsers: (req, res) => {
    res.status(200).json(data);
  },
  getUser: (req, res) => {
    const { id } = req.params;
    const user = data.find((item) => item.id.toString() === id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('<h3>User not found</h3>')
    }
  },
  createUser: ( ) => {},
  updateUser: ( ) => {},
  deleteUser: ( ) => {},
}

module.exports = controller;
