const dynamoDb = require('../dynamoDB/dynamoDb');
const uuid = require('uuid');

const USERS_TABLE = 'users-table';

const controller = {
  getUsers: async (req, res) => {
    const users = await dynamoDb.getAll(USERS_TABLE)
      .catch(err => {
        res.status(400).json({ error: err });
      });
     
    if (users.length) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ error: "Users not found" });
    }
  },

  getUser: async (req, res) => {
    const { id } = req.params;

    const user = await dynamoDb.get(id, USERS_TABLE)
      .catch(err => {
        return res.status(400).json({ error: err });
      });

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
  },

  createUser: (req, res) => {
    const id = req.body.id ?? uuid.v1();
    const { name } = req.body;

    const user = {
      id,
      name,
    };

    dynamoDb.create(user, USERS_TABLE)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(400).json({ error: err });
      });
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    dynamoDb.update({
      id,
      TableName: USERS_TABLE,
      UpdateExpression: `set #name = :name`,
      ExpressionAttributeNames: {
        '#name': `name`,
      },
      ExpressionAttributeValues: {
        ":name": name,
      },
      ReturnValues: `UPDATED_NEW`,
    })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(400).json({ error: err });
      });
  },

  deleteUser: (req, res) => {
    const { id } = req.params;
    dynamoDb.delete(id, USERS_TABLE)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(400).json({ error: err });
      });
  },
}

module.exports = controller;
