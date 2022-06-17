const data = require('../model/users');
const findUser = require('../utils/findUser');

const controller = {
  getUsers: (req, res) => {
    res.status(200).json(data);
  },
  getUser: (req, res) => {
    const user = findUser(req, data);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  },
  createUser: (req, res) => {
    const newId = data.length ? data.at(-1).id + 1 : 1; 
    const newUser = {
      id: newId,
      name: req.body.name,
    };

    data.push(newUser);

    res.status(201).json(newUser);
  },
  updateUser: (req, res) => {
    const user = findUser(req, data);
    if (user) {
      const updatedUser = {
        id: user.id,
        name: req.body.name,
      };

      const targetIndex = data.indexOf(user);
      data.splice(targetIndex, 1, updatedUser);

      res.status(200).json(updatedUser); 
    } else {
      res.status(404).send('User not found');
    }
  },
  deleteUser: (req, res) => {
    user = findUser(req, data);
    if (user) {
      const targetIndex = data.indexOf(user);
      data.splice(targetIndex, 1);

      res.sendStatus(204);
    } else {
      res.status(404).send('User not found');
    }
  },
}

module.exports = controller;
