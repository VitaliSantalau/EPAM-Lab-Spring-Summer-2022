const AWS = require('aws-sdk');

const IS_OFFLINE = process.env.IS_OFFLINE;
const JEST_WORKER_ID = process.env.JEST_WORKER_ID;

let options = {
  accessKeyId: 'DEFAULT_ACCESS_KEY',
  secretAccessKey: 'DEFAULT_SECRET',
};
if (IS_OFFLINE === 'true') {
  options = {
    ...options,
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  };
};
if (JEST_WORKER_ID) {
  options = {
    ...options,
    region: 'local-env',
    endpoint: 'http://localhost:8000',
    sslEnabled: false,
    convertEmptyValues: true,
  };
};

client = new AWS.DynamoDB.DocumentClient(options);

dynamoDb = {
  async getAll(TableName) {
    const params = {
      TableName,
    };
    const data = await client.scan(params).promise();

    if (!data || !data.Items) {
      throw Error(`There was an error fetching the all data from ${TableName}`);
    }

    return data.Items;
  },

  async get(id, TableName) {
    const params = {
      TableName,
      Key: {
        id,
      },
    };
    const data = await client.get(params).promise();

    if (!data) {
      throw Error(`There was an error fetching the item data from ${TableName}`);
    }

    return data.Item;
  },

  async create(Item, TableName) {
    const params = {
      TableName,
      Item,
    };
    const res = await client.put(params).promise();

    if (!res) {
      throw Error(`There was an error creating the item in ${TableName}`);
    }

    return Item;
  },

  async update({
    id, TableName, UpdateExpression, ExpressionAttributeNames,
    ExpressionAttributeValues, ReturnValues,
  }) {
    const params = {
      TableName,
      Key: {
        id,
      },
      UpdateExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
      ReturnValues,
    };

    const res = await client.update(params).promise();

    if (!res) {
      throw Error(`There was an error updating the item in ${TableName}`);
    }

    return res.Attributes;
  },

  async delete(id, TableName) {
    const params = {
      TableName,
      Key: {
        id,
      },
    };
    const res = await client.delete(params).promise();

    if (!res) {
      throw Error(`There was an error deleting the item in ${TableName}`);
    }

    return {};
  }
}

module.exports = dynamoDb;
