const AWS = require('aws-sdk');
const uuid = require('uuid');

const USERS_TABLE = process.env.USERS_TABLE;
const IS_OFFLINE = process.env.IS_OFFLINE;

let dynamoDb;
if (IS_OFFLINE === 'true') {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    accessKeyId: 'DEFAULT_ACCESS_KEY',
    secretAccessKey: 'DEFAULT_SECRET',
  });
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
        res.status(400).json({ error: 'Could not get users' });
      };
      if (result.Items.length) {
        res.status(200).json(result.Items);
      } else {
        res.status(404).json({ error: "Users not found" });
      }
    });
  },
  getUser: (req, res) => {
    const { id } = req.params;
    const params = {
      TableName: USERS_TABLE,
      Key: {
        userId: id,
      },
    };
    dynamoDb.get(params, (error, result) => {
      if (error) {
        res.status(400).json({ error: 'Could not get user' });
      }
      if (result.Item) {
        res.status(200).json(result.Item);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    });
  },
  createUser: (req, res) => {
    const userId = uuid.v1();
    const { name } = req.body;
    const params = {
      TableName: USERS_TABLE,
      Item: {
        userId,
        name,
      },
    };
    dynamoDb.put(params, (error) => {
      if (error) {
        return res.status(400).json({ error: 'Could not create user' });
      }
      res.status(201).json({ userId, name });
    });
  },
  updateUser: (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const params = {
      TableName: USERS_TABLE,
      Key: {
        userId: id,
      },
      UpdateExpression: `set #name = :name`,
      ExpressionAttributeNames: {
        '#name': `name`,
      },
      ExpressionAttributeValues: {
        ":name": name,
      },
      ReturnValues: `UPDATED_NEW`,
    };
    dynamoDb.update(params, (error, result) => {
      if (error) {
        return res.status(400).json({ error: 'Could not update user' });
      }
      res.status(200).json(result.Attributes);
    });
  },
  deleteUser: (req, res) => {
    const { id } = req.params;
    const params = {
      TableName: USERS_TABLE,
      Key: {
        userId: id,
      },
    };
    dynamoDb.delete(params, (error) => {
      if (error) {
        return res.status(400).json({ error: 'Could not delete user' });
      }
      res.status(200).json({});
    });
  },
}

module.exports = controller;
