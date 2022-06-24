module.exports = {
  tables: [
    {
      TableName: 'users-table',
      AttributeDefinitions: [
        {
          AttributeName: 'userId',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'userId',
          KeyType: 'HASH',
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      },
    },
  ],
};
