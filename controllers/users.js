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
  createUser: async (req, res) => {
    const id = uuid.v1();
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
        return res.status(400).json({ error: err });
      });

    // const params = {
    //   TableName: USERS_TABLE,
    //   Item: {
    //     userId,
    //     name,
    //   },
    // };
    // dynamoDb.put(params, (error) => {
    //   if (error) {
    //     return res.status(400).json({ error: 'Could not create user' });
    //   }
    //   res.status(201).json({ userId, name });
    // });
  },
  // updateUser: (req, res) => {
  //   const { id } = req.params;
  //   const { name } = req.body;
  //   const params = {
  //     TableName: USERS_TABLE,
  //     Key: {
  //       userId: id,
  //     },
  //     UpdateExpression: `set #name = :name`,
  //     ExpressionAttributeNames: {
  //       '#name': `name`,
  //     },
  //     ExpressionAttributeValues: {
  //       ":name": name,
  //     },
  //     ReturnValues: `UPDATED_NEW`,
  //   };
  //   dynamoDb.update(params, (error, result) => {
  //     if (error) {
  //       return res.status(400).json({ error: 'Could not update user' });
  //     }
  //     res.status(200).json(result.Attributes);
  //   });
  // },
  // deleteUser: (req, res) => {
  //   const { id } = req.params;
  //   const params = {
  //     TableName: USERS_TABLE,
  //     Key: {
  //       userId: id,
  //     },
  //   };
  //   dynamoDb.delete(params, (error) => {
  //     if (error) {
  //       return res.status(400).json({ error: 'Could not delete user' });
  //     }
  //     res.status(200).json({});
  //   });
  // },
}

module.exports = controller;
