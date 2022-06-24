const AWS = require('aws-sdk');

const USERS_TABLE = process.env.USERS_TABLE;
const JEST_WORKER_ID = process.env.JEST_WORKER_ID;

let dynamoDb;
if (JEST_WORKER_ID) {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'local-env',
    endpoint: 'http://localhost:8000',
    sslEnabled: false,
    accessKeyId: 'DEFAULT_ACCESS_KEY',
    secretAccessKey: 'DEFAULT_SECRET',
    convertEmptyValues: true,
  });
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient();
};

test('dynamoDb is an object', () => {
  expect(typeof dynamoDb).toBe('object');
});

test('should create user', () => {
  const req = {
    body: JSON.stringify({
      name: 'Roma',
    })
  };
  const res = {
    status: () => {},
    json: () => {},
  }
})

// it('should insert user into table', async () => {
//   await dynamoDb.put({
//     TableName: USERS_TABLE,
//     Item: {
//       userId: '1',
//       name: 'user',
//     }
//   }).promise();

//   const { Item } = await dynamoDb.get({
//     TableName: USERS_TABLE,
//     Key: {
//       userId: '1'
//     }
//   }).promise();

//   expect(Item).toEqual({
//     userId: '1',
//     name: 'user',
//   });
// });
