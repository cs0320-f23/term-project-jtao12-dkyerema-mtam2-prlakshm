import * as MongoFunctions from '../../src/mongo/Mongo-Functions';

beforeAll(async () => {
  // Call the function to initialize the Stitch client
  await MongoFunctions.initializeStitchClient();
});

describe("getAllItems", () => {
  it("fetches all master and sold items from the database", async () => {
    // Calling function
    const [master_items, sold_items] = await MongoFunctions.getAllItems();

    // Assert master_items and sold_items is defined
    expect(master_items).toBeDefined();
    expect(sold_items).toBeDefined();

    // Assert item[] have of all items in database
    expect(master_items).toHaveLength(21);
    expect(sold_items).toHaveLength(21);

     // Assert that all values in master_items are defined
     expect(master_items?.every(item => item !== undefined)).toBe(true);

     // Assert that all values in sold_items are defined
     expect(sold_items?.every(item => item !== undefined)).toBe(true);

  });
});
