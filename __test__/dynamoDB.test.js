const dynamoDb = require('../dynamoDB/dynamoDb');

const USERS_TABLE = 'users-table';

const item = {
  id: '1',
  name: 'Vitali',
};

const updatedItem = {
  name: 'Vitali Santalau',
};

describe("Test dynamoDB", () => {

  it('dynamoDb is an object', () => {
    expect(typeof dynamoDb).toBe('object');
  });

  it('should return empty array', async () => {
    const items = await dynamoDb.getAll(USERS_TABLE);
    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBe(0);
  });

  it('should not return item', async () => {
    const item = await dynamoDb.get(id = '1', USERS_TABLE);
    expect(item).toBe(undefined);
  });

  it('should insert item into table', async () => {
    const response = await dynamoDb.create(item, USERS_TABLE);
    expect(response).toBe(item);
  });

  it('should return item', async () => {
    const response = await dynamoDb.get(id = '1', USERS_TABLE);
    expect(response).toStrictEqual(item);
  });

  it('should update item', async () => {
    const response = await dynamoDb.update({
      id: '1',
      TableName: USERS_TABLE,
      UpdateExpression: `set #name = :name`,
      ExpressionAttributeNames: {
        '#name': `name`,
      },
      ExpressionAttributeValues: {
        ":name": updatedItem.name,
      },
      ReturnValues: `UPDATED_NEW`,
    });
    expect(response).toStrictEqual(updatedItem);
  });

  it('should delete item', async () => {
    const response = await dynamoDb.delete(id = '1', USERS_TABLE);
    expect(response).toStrictEqual({});
  });
});
