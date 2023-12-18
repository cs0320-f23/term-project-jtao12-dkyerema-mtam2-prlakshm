import { BSON } from "bson";
import * as MongoFunctions from "../../src/mongo/Mongo-Functions";
import Item from "../../src/models/item";

beforeAll(async () => {
  // Call the function to initialize the Stitch client
  await MongoFunctions.initializeStitchClient();
});

describe("getItemListById", () => {
  it("returns an array of items for the given item ids from seller's listing feilds", async () => {
    // Assuming there are existing items and accounts in the database

    // Fetch the account by username "Sophia_Cheng"
    const sellerUsername = "Sophia_Cheng";
    const sellerAccount = await MongoFunctions.getAccountByUsername(
      sellerUsername
    );

    // Ensure the account has been fetched successfully
    expect(sellerAccount).toBeDefined();

    if (
      sellerAccount &&
      sellerAccount.currentListing_ids &&
      sellerAccount.pastListing_ids
    ) {
      // Use getItemListById on the current listings of the account
      const currentListingItems: Item[] = await MongoFunctions.getItemListById(
        sellerAccount?.currentListing_ids
      );

      // Check if every element in the returned list is an item
      expect(currentListingItems).toHaveLength(
        sellerAccount?.currentListing_ids.length
      );
      for (const item of currentListingItems) {
        expect(Item.fromObject(item)).toBeInstanceOf(Item);
      }

      // Use getItemListById on the past listings of the account
      const pastListingItems: Item[] = await MongoFunctions.getItemListById(
        sellerAccount?.pastListing_ids
      );

      // Check if every element in the returned list is an item
      expect(pastListingItems).toHaveLength(
        sellerAccount?.pastListing_ids.length
      );
      for (const item of pastListingItems) {
        expect(Item.fromObject(item)).toBeInstanceOf(Item);
      }
    } else {
      fail("getItemListById failed to get item list by list of ids");
    }
  });
  it("returns a list of items for valid item ids from both master_items and sold_items", async () => {
    // Sample item IDs for testing
    const itemIds = [
      new BSON.ObjectId("656bb24eabfe68217e3eb934"),
      new BSON.ObjectId("656bb24eabfe68217e3eb936"),
      new BSON.ObjectId("656bb25aabfe68217e3eb93d"),
      new BSON.ObjectId("656bb25aabfe68217e3eb941"),
    ];

    // Use getItemListById with the list of item IDs
    const itemList: Item[] = await MongoFunctions.getItemListById(itemIds);
    // Check the length of the returned list
    expect(itemList).toHaveLength(4);

    // Check that all elements in the list are instances of Item
    for (const item of itemList) {
      expect(Item.fromObject(item)).toBeInstanceOf(Item);
    }
  });
  it("returns an empty array when given an empty list of item ids", async () => {
    // Use getItemListById with an empty list of item IDs
    const emptyItemList = await MongoFunctions.getItemListById([]);

    // Check if the returned list is empty
    expect(emptyItemList).toHaveLength(0);
  });
});

function generateRandomString(length: number): string {
  let result = "";
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe("ifUsernameAlreadyExists", () => {
  it("returns true for existing usernames", async () => {
    const existingUsernames = ["bookwormArtisan", "DIYQueen", "Sophia_Cheng"];
    for (const username of existingUsernames) {
      const result = await MongoFunctions.ifUsernameAlreadyExists(username);
      expect(result).toBe(true);
    }
  });

  it("fuzz test returns false for 100 random non-existing usernames", async () => {
    const randomLength = getRandomInt(0, 16);
    const randomUsernames = Array.from({ length: 100 }, () =>
      generateRandomString(randomLength)
    );
    for (const username of randomUsernames) {
      const result = await MongoFunctions.ifUsernameAlreadyExists(username);
      expect(result).toBe(false);
    }
  }, 50000); // Set the timeout to 50000 milliseconds (50 seconds) or adjust as needed

  it("returns a mix of true and false for a combination of usernames", async () => {
    // Expect that the result is either true or false based on the username
    const result1 = await MongoFunctions.ifUsernameAlreadyExists(
      "vintageVibes"
    );
    expect(result1).toBeTruthy();
    const result2 = await MongoFunctions.ifUsernameAlreadyExists("afdsfsdgh");
    expect(result2).toBeFalsy();
    const result3 = await MongoFunctions.ifUsernameAlreadyExists(
      "ecoFriendlySoul"
    );
    expect(result3).toBeTruthy();
  });
});

describe("getAllUsernames", () => {
  it("fuzz test returns the correct list of usernames all 10 times", async () => {
    // Your sample data
    const sampleUsernames = [
      "FashionExplorer",
      "Wire&TuftCrafts",
      "vintageVibes",
      "Jackie_Cohen",
      "ecoFriendlySoul",
      "PotteryPassion",
      "Sophia_Cheng",
      "scienceGeek",
      "ArtsyTotes",
      "ClayCraftsman",
      "DIYQueen",
      "ThreadArtCraft",
      "natureInspired",
      "bookwormArtisan",
      "MacaraméJungle",
    ];

    // Run the function 10 times and check if the returned usernames match the sample
    for (let i = 0; i < 10; i++) {
      const usernames = await MongoFunctions.getAllUsernames();
      expect(usernames).toEqual(expect.arrayContaining(sampleUsernames));
    }
  });
});

describe("getProfilePhotoByUsername", () => {
  it("returns correct profile photo filename for existing usernames", async () => {
    // Array of existing usernames and profile photo filenames
    const existingUsernames = [
      "FashionExplorer",
      "Wire&TuftCrafts",
      "vintageVibes",
    ];
    const expectedProfilePhotoFilenames = [
      "fashionExplorer.jpg",
      "craftyCreator.jpg",
      "vintageVibes.jpg",
    ];

    // Loop through each existing username for testing
    for (let i = 0; i < existingUsernames.length; i++) {
      const username = existingUsernames[i];
      const result = await MongoFunctions.getProfilePhotoByUsername(username);
      const expected = expectedProfilePhotoFilenames[i];
      expect(result).toBe(expected);
    }
  });
  it("returns undefined for non-existing username", async () => {
    // Call the function with the non-existing username
    const result = await MongoFunctions.getProfilePhotoByUsername(
      "nonexistentUser"
    );
    expect(result).toBeUndefined();
  });
});
