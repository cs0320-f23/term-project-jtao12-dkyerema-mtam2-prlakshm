import { BSON } from "bson";
import Item from "../../src/models/item";
import * as MongoFunctions from "../../src/mongo/Mongo-Functions";

beforeAll(async () => {
  // Call the function to initialize the Stitch client
  await MongoFunctions.initializeStitchClient();
});

describe("insertNewItem", () => {
  it("inserts a new item into the database and fetches it by Id", async () => {
    const newItemTitle = "Test Item";
    const newItemDescription = "Description for test item";
    const newItemSeller = "vintageVibes";
    const newItemCategory = "TestCategory";
    const newItemSubcategory = "TestSubcategory";
    const newItemPrice = 10;
    const newItemPhotoFilenames = ["photo1.jpg", "photo2.jpg"];

    // Insert a new item
    const newItemId = await MongoFunctions.insertNewItem(
      newItemTitle,
      newItemDescription,
      newItemSeller,
      newItemCategory,
      newItemSubcategory,
      newItemPrice,
      newItemPhotoFilenames
    );

    // Fetch the ID of the newly added item (Assuming getItemIdByName is implemented)
    if (newItemId) {
      const fetchedItem = await MongoFunctions.getItemById(newItemId);

      // Check if the item has been fetched
      expect(fetchedItem).toBeDefined();
      // Check that the return of getItemById
      expect(fetchedItem?.title).toEqual(newItemTitle);
      expect(fetchedItem?.description).toEqual(newItemDescription);
      expect(fetchedItem?.seller).toEqual(newItemSeller);
      expect(fetchedItem?.category).toEqual(newItemCategory);
      expect(fetchedItem?.subcategory).toEqual(newItemSubcategory);
      expect(fetchedItem?.price).toEqual(newItemPrice);
      expect(fetchedItem?.photoFilenames).toEqual(newItemPhotoFilenames);

      await MongoFunctions.deleteItemById(newItemId);
    } else {
      fail("insertNewItem failed to add new item");
    }
  });
});

describe("insertNewAccount", () => {
  it("inserts a new account, adds item to liked listings, and fetches liked items", async () => {
    const newUsername = "testUser";
    const newFullname = "Test User";
    const newEmail = "testuser@example.com";
    const newBio = "This is a test user.";
    const newProfilePhotoFilename = "profile.jpg";
    const newContactInformation = new Map([
      ["email", newEmail],
      ["phone", "123-456-7890"],
    ]);

    // Insert a new account
    const newAccountId = await MongoFunctions.insertNewAccount(
      newUsername,
      newFullname,
      newEmail,
      newBio,
      newProfilePhotoFilename,
      newContactInformation
    );

    // Fetch the ID of the newly added account
    if (newAccountId) {
      // Fetch the account by username
      const fetchedAccount = await MongoFunctions.getAccountById(newAccountId);

      // Check if the account has been fetched
      expect(fetchedAccount).toBeDefined();

      // Check the properties of the fetched account
      expect(fetchedAccount?.username).toEqual(newUsername);
      expect(fetchedAccount?.fullname).toEqual(newFullname);
      expect(fetchedAccount?.email).toEqual(newEmail);
      expect(fetchedAccount?.bio).toEqual(newBio);
      expect(fetchedAccount?.profilePhotoFilename).toEqual(
        newProfilePhotoFilename
      );
      expect(fetchedAccount?.contactInformation).toEqual(
        Object.fromEntries(newContactInformation)
      );

      // Check if the liked items array contains the new item ID
      expect(fetchedAccount?.likedItem_ids).toEqual([]);

      //---------------------------------------------------------------------------------------------

      // Create a new items to add to the liked listings
      const newItemId1 = new BSON.ObjectId("656bb24eabfe68217e3eb927");
      const newItemId2 = new BSON.ObjectId("656bb24eabfe68217e3eb92c");

      // Add item to liked listings
      await MongoFunctions.addItemToLikedListings(newUsername, newItemId1);
      await MongoFunctions.addItemToLikedListings(newUsername, newItemId2);

      const fetchedAccountUpdated = await MongoFunctions.getAccountByUsername(
        newUsername
      );
      // Check if the liked items array contains the new item ID
      expect(fetchedAccountUpdated?.likedItem_ids).toHaveLength(2)

      // Delete the account
      await MongoFunctions.deleteAccountById(newAccountId);
    } else {
      fail("insertNewAccount failed to add new account");
    }
  });
});

// udate item, update account, mark as sold

//miscelaneous test: get Item[] from Id[], if username exists, get list usernames
