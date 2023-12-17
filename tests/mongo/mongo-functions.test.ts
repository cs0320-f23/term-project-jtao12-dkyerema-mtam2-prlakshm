import { getAllItems } from '../../src/mongo/Mongo-Functions'
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('getAllItems', () => {
  let mongoServer: MongoMemoryServer;
  let mongoClient: MongoClient;

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    mongoClient = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoClient.connect();
  });

  afterAll(async () => {
    await mongoClient.close();
    await mongoServer.stop();
  });

  it('fetches master and sold items from the database', async () => {
    // Insert test data into the in-memory database
    const db = mongoClient.db('artists_corner_pvd');
    await db.collection('master_items').insertMany([{ /* your test data */ }]);
    await db.collection('sold_items').insertMany([{ /* your test data */ }]);

    // Call your function
    const result = await getAllItems(mongoClient);

    // Assertions
    expect(result).toBeDefined();
    // Add more specific assertions based on your test data
  });

  it('handles errors and returns an empty array', async () => {
    // Handle errors as needed in your function
    // Mock external dependencies if necessary
    // Call your function
    const result = await getAllItems(/* pass mocked dependencies as needed */);

    // Assertions
    expect(result).toEqual([]);
  });
});
