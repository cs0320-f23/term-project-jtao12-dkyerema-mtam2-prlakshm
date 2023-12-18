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


describe("updateItem", () => {
    it("updates an item in the database and checks if changed feilds", async () => {
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
  
        //-------------------------------------------------------------

        // Update title and description fields
        const updatedTitle = "Updated Item Title"
        const updatedDescription = "Updated Item Description"

        // Update item 
        await MongoFunctions.updateItem(
            newItemId,
            updatedTitle,
            updatedDescription,
            newItemSeller,
            newItemCategory,
            newItemSubcategory,
            newItemPrice,
            newItemPhotoFilenames
          );

          const updatedItem = await MongoFunctions.getItemById(newItemId);
  
          // Check if the updated item has been fetched
          expect(updatedItem).toBeDefined();
          // Check that only title and description have been modified
          expect(updatedItem?.title).toEqual(updatedTitle);
          expect(updatedItem?.description).toEqual(updatedDescription);
          expect(updatedItem?.seller).toEqual(newItemSeller);
          expect(updatedItem?.category).toEqual(newItemCategory);
          expect(updatedItem?.subcategory).toEqual(newItemSubcategory);
          expect(updatedItem?.price).toEqual(newItemPrice);
          expect(updatedItem?.photoFilenames).toEqual(newItemPhotoFilenames);  

          // Delete the item
        await MongoFunctions.deleteItemById(newItemId);
      } else {
        fail("updateItem failed to update item");
      }
    });
  });

  describe("updateAccount", () => {
    it("updates an account in the database and checks if changed fields", async () => {
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
  
        //-------------------------------------------------------------
  
        // Update bio and contact information fields
        const updatedBio = "Updated bio for the test user";
        const updatedContactInformation = new Map([
          ["email", "updated@example.com"],
          ["phone", "987-654-3210"],
          [ "instagram", "@testuser"]
        ]);
  
        // Update account
        await MongoFunctions.updateAccount(
          newAccountId,
          newUsername,
          newFullname,
          newEmail,
          updatedBio,
          newProfilePhotoFilename,
          updatedContactInformation
        );
  
        const updatedAccount = await MongoFunctions.getAccountById(newAccountId);
  
        // Check if the updated account has been fetched
        expect(updatedAccount).toBeDefined();
        // Check that only bio and contact information have been modified
        expect(updatedAccount?.username).toEqual(newUsername);
        expect(updatedAccount?.fullname).toEqual(newFullname);
        expect(updatedAccount?.email).toEqual(newEmail);
        expect(updatedAccount?.bio).toEqual(updatedBio);
        expect(updatedAccount?.profilePhotoFilename).toEqual(
          newProfilePhotoFilename
        );
        expect(updatedAccount?.contactInformation).toEqual(
            Object.fromEntries(updatedContactInformation)
          );
        // Delete the account
        await MongoFunctions.deleteAccountById(newAccountId);
      } else {
        fail("updateAccount failed to update account");
      }
    });
  });
  
  
// udate item, update account, mark as sold

//miscelaneous test: get Item[] from Id[], if username exists, get list usernames
