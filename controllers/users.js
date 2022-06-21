// const data = require('../model/users');
// const findUser = require('../utils/findUser');
const AWS = require('aws-sdk');

const USERS_TABLE = process.env.USERS_TABLE;
const IS_OFFLINE = process.env.IS_OFFLINE;

let dynamoDb;
if (IS_OFFLINE === 'true') {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    accessKeyId: 'DEFAULT_ACCESS_KEY',
    secretAccessKey: 'DEFAULT_SECRET',
  })
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient();
};

const controller = {
  getUsers: (req, res) => {
    const params = {
      TableName: USERS_TABLE,
    };
    dynamoDb.scan(params, (error, result) => {
      if (error) {
        // console.log(error);
        res.status(400).send('Could not get users');
      }
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(200).send("Users not found");
      }
    });
  },
  getUser: (req, res) => {
    // const user = findUser(req, data);
    // if (user) {
    //   res.status(200).json(user);
    // } else {
    //   res.status(404).send('User not found');
    // }
  },
  createUser: (req, res) => {
    // const newId = data.length ? data.at(-1).id + 1 : 1; 
    const newId = 1;
    const params = {
      TableName: USERS_TABLE,
      Item: {
        userId: newId,
        name: req.body.name,
      },
    };
    dynamoDb.put(params, (error) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not create user' });
      }
      res.json({ userId: newId, name: req.body.name });
    });
    // const newUser = {
    //   id: newId,
    //   name: req.body.name,
    // };

    // data.push(newUser);

    // res.status(201).json(newUser);
  },
  updateUser: (req, res) => {
    // const user = findUser(req, data);
    // if (user) {
    //   const updatedUser = {
    //     id: user.id,
    //     name: req.body.name,
    //   };

    //   const targetIndex = data.indexOf(user);
    //   data.splice(targetIndex, 1, updatedUser);

    //   res.status(200).json(updatedUser); 
    // } else {
    //   res.status(404).send('User not found');
    // }
  },
  deleteUser: (req, res) => {
//     user = findUser(req, data);
//     if (user) {
//       const targetIndex = data.indexOf(user);
//       data.splice(targetIndex, 1);

//       res.sendStatus(204);
//     } else {
//       res.status(404).send('User not found');
//     }
  },
}

module.exports = controller;
