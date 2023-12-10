// Mongo-Functions.ts
import {
  Stitch,
  RemoteMongoClient,
  UserApiKeyCredential,
  RemoteMongoCollection,
  StitchAppClient,
  RemoteFindOptions,
  BSON,
} from "mongodb-stitch-browser-sdk";
import Item from "../models/item";
import Account from "../models/account";

export type ItemTuple = [Item[], Item[]] | [];

let client: StitchAppClient | undefined;
let mongodb: RemoteMongoClient | undefined;

/**
 * Call this function ONCE at the begginging of a .tsx file to connect to the client.
 * Will error if run this method multiple times (cannot connect to client multiple times).
 */
export const initializeStitchClient = () => {
  if (!client) {
    const appId = "artists_corner_0-lcspi";
    client = Stitch.hasAppClient(appId)
      ? Stitch.getAppClient(appId)
      : Stitch.initializeAppClient(appId);

    mongodb = client.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
  }
};

/**
 * Retrieve all items from database
 * @returns tuple of [masterItems, soldItems] of all items
 */
export async function getAllItems(): Promise<ItemTuple> {
  try {
    await client?.auth.loginWithCredential(
      new UserApiKeyCredential(
        "iHXM2LKmwUIPYiBQqQvNOAnAm9QRTV4Qma04bxVp0c4rsszVNTpedtz2j9KIzkYN"
      )
    );

    const db = mongodb?.db("artists_corner_pvd");
    if (!db) {
      throw new Error("Database not available");
    }

    const masterItemsCollection: RemoteMongoCollection<Item> =
      db.collection("master_items");
    const masterItemsCursor = masterItemsCollection.find();
    const master_Items: Item[] = await masterItemsCursor.toArray();

    const soldItemsCollection: RemoteMongoCollection<Item> =
      db.collection("sold_items");
    const soldItemsCursor = soldItemsCollection.find();
    const sold_Items: Item[] = await soldItemsCursor.toArray();

    return [master_Items, sold_Items];
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}

/**
 * Retrieves items from database from a specific category
 * @param category string (insensitive) of category want to search for
 * @returns tuple of [masterItems, soldItems] of items in that category
 */
export async function getItemsByCategory(category: string): Promise<ItemTuple> {
  try {
    await client?.auth.loginWithCredential(
      new UserApiKeyCredential(
        "iHXM2LKmwUIPYiBQqQvNOAnAm9QRTV4Qma04bxVp0c4rsszVNTpedtz2j9KIzkYN"
      )
    );

    const db = mongodb?.db("artists_corner_pvd");
    if (!db) {
      throw new Error("Database not available");
    }

    const masterItemsCollection: RemoteMongoCollection<Item> =
      db.collection("master_items");
    const masterCategoryItemsCursor = masterItemsCollection.find({
      category: { $regex: category, $options: "i" },
    } as RemoteFindOptions);
    const masterCategoryItems: Item[] =
      await masterCategoryItemsCursor.toArray();

    const soldItemsCollection: RemoteMongoCollection<Item> =
      db.collection("sold_items");
    const soldCategoryItemsCursor = soldItemsCollection.find({
      category: { $regex: category, $options: "i" },
    } as RemoteFindOptions);
    const soldCategoryItems: Item[] = await soldCategoryItemsCursor.toArray();

    return [masterCategoryItems, soldCategoryItems];
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}

/**
 * Retrieves items from database from a specific category and subcategory
 * @param category string (insensitive) of category want to search for
 * @param subcategory string (insensitive) of subcatefory want to search for -- must be INSIDE
 * category, or list will be empty, because searches for both category and subcategory match
 * @returns tuple of [masterItems, soldItems] of items in that category
 */
export async function getItemsByCategoryAndSubcategory(
  category: string,
  subcategory: string
): Promise<ItemTuple> {
  try {
    await client?.auth.loginWithCredential(
      new UserApiKeyCredential(
        "iHXM2LKmwUIPYiBQqQvNOAnAm9QRTV4Qma04bxVp0c4rsszVNTpedtz2j9KIzkYN"
      )
    );

    const db = mongodb?.db("artists_corner_pvd");
    if (!db) {
      throw new Error("Database not available");
    }

    const masterItemsCollection: RemoteMongoCollection<Item> =
      db.collection("master_items");
    const masterCategoryAndSubcategoryItemsCursor = masterItemsCollection.find({
      category: { $regex: category, $options: "i" },
      subcategory: { $regex: subcategory, $options: "i" },
    } as RemoteFindOptions);
    const masterCategoryAndSubcategoryItems: Item[] =
      await masterCategoryAndSubcategoryItemsCursor.toArray();

    const soldItemsCollection: RemoteMongoCollection<Item> =
      db.collection("sold_items");
    const soldCategoryAndSubcategoryItemsCursor = soldItemsCollection.find({
      category: { $regex: category, $options: "i" },
      subcategory: { $regex: subcategory, $options: "i" },
    } as RemoteFindOptions);
    const soldCategoryAndSubcategoryItems: Item[] =
      await soldCategoryAndSubcategoryItemsCursor.toArray();

    return [masterCategoryAndSubcategoryItems, soldCategoryAndSubcategoryItems];
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}

/**
 * Retrieves items from database from a ONLY a subcategory
 * @param subcategory string (insensitive) of subcategory want to search for
 * @returns tuple of [masterItems, soldItems] of items in that subcategory
 */
export async function getItemsBySubcategory(
  subcategory: string
): Promise<ItemTuple> {
  try {
    await client?.auth.loginWithCredential(
      new UserApiKeyCredential(
        "iHXM2LKmwUIPYiBQqQvNOAnAm9QRTV4Qma04bxVp0c4rsszVNTpedtz2j9KIzkYN"
      )
    );

    const db = mongodb?.db("artists_corner_pvd");
    if (!db) {
      throw new Error("Database not available");
    }

    const masterItemsCollection: RemoteMongoCollection<Item> =
      db.collection("master_items");
    const masterSubcategoryItemsCursor = masterItemsCollection.find({
      subcategory: { $regex: subcategory, $options: "i" },
    } as RemoteFindOptions);
    const masterSubcategoryItems: Item[] =
      await masterSubcategoryItemsCursor.toArray();

    const soldItemsCollection: RemoteMongoCollection<Item> =
      db.collection("sold_items");
    const soldSubcategoryItemsCursor = soldItemsCollection.find({
      subcategory: { $regex: subcategory, $options: "i" },
    } as RemoteFindOptions);
    const soldSubcategoryItems: Item[] =
      await soldSubcategoryItemsCursor.toArray();

    return [masterSubcategoryItems, soldSubcategoryItems];
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}

/**
 * Retrieves items from database from based on search string
 * @param keyword string (insensitive) of keyword(s) want to search for
 * @returns tuple of [masterItems, soldItems] of items in with that keyword
 */
export async function searchItems(keywords: string): Promise<ItemTuple> {
  try {
    await client?.auth.loginWithCredential(
      new UserApiKeyCredential(
        "iHXM2LKmwUIPYiBQqQvNOAnAm9QRTV4Qma04bxVp0c4rsszVNTpedtz2j9KIzkYN"
      )
    );

    const db = mongodb?.db("artists_corner_pvd");
    if (!db) {
      throw new Error("Database not available");
    }

    const keywordRegex = { $regex: keywords, $options: "i" };
    const dollarAmount = parseInt(
      keywords.replace(/\$([\d]+)(\.\d{1,2})?/, "")
    );

    const masterItemsCollection: RemoteMongoCollection<Item> =
      db.collection("master_items");
    const masterSearchQuery = {
      $or: [
        { title: keywordRegex },
        { description: keywordRegex },
        { category: keywordRegex },
        { subcategory: keywordRegex },
        { seller: keywordRegex },
        { price: { $gt: dollarAmount - 1, $lt: dollarAmount + 1 } },
      ],
    };
    const masterItemsCursor = masterItemsCollection.find(masterSearchQuery);
    const masterSearchResults: Item[] = await masterItemsCursor.toArray();

    const soldItemsCollection: RemoteMongoCollection<Item> =
      db.collection("sold_items");
    const soldSearchQuery = {
      $or: [
        { title: keywordRegex },
        { description: keywordRegex },
        { category: keywordRegex },
        { subcategory: keywordRegex },
        { seller: keywordRegex },
        { price: { $gt: dollarAmount - 1, $lt: dollarAmount + 1 } },
      ],
    };
    const soldItemsCursor = soldItemsCollection.find(soldSearchQuery);
    const soldSearchResults: Item[] = await soldItemsCursor.toArray();

    return [masterSearchResults, soldSearchResults];
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}

/**
 * Retrieves items from database from its object id
 * @param id object id -- if have string of id use new BSON.ObjectId([string]) and make sure
 * BSON is imported from mongodb-stitch-browser-sdk
 *
 * Obejct Id must be a 24 character hex string, 12 byte binary Buffer, or a number
 * or else it will error (for simplicity, we use a 24 character hex string).
 *
 * @returns Item with object id or undefined if error -- no or multiple items with id
 */
export async function getItemById(
  id: BSON.ObjectId
): Promise<Item | undefined> {
  try {
    await client?.auth.loginWithCredential(
      new UserApiKeyCredential(
        "iHXM2LKmwUIPYiBQqQvNOAnAm9QRTV4Qma04bxVp0c4rsszVNTpedtz2j9KIzkYN"
      )
    );

    const db = mongodb?.db("artists_corner_pvd");
    if (!db) {
      throw new Error("Database not available");
    }

    const masterItemsCollection: RemoteMongoCollection<Item> =
      db.collection("master_items");
    const masterItem: Item[] = await masterItemsCollection
      .find({
        _id: id,
      })
      .toArray();

    const soldItemsCollection: RemoteMongoCollection<Item> =
      db.collection("sold_items");
    const soldItem: Item[] = await soldItemsCollection
      .find({
        _id: id,
      })
      .toArray();

    if (masterItem.length === 0 && soldItem.length === 0) {
      console.error("No item with Object ID");
      return undefined;
    } else if (masterItem.length === 1 && soldItem.length === 0) {
      return masterItem[0];
    } else if (soldItem.length === 1 && masterItem.length === 0) {
      return soldItem[0];
    } else {
      console.error("Multiple items with Object ID");
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching item by ID:", error);
    return undefined;
  }
}

/**
 * Returns Item[] from BSON.ObjectId[] -- use for account fields
 * currentListing_ids, pastListing_ids, purchasedItems_ids,
 * likedItem_ids
 * @param itemIds list of BSON.ObjectIds want to return item values of
 * @returns item[] from object ids
 */
export async function getItemListById(
  itemIds: BSON.ObjectId[]
): Promise<Item[]> {
  const itemPromises = itemIds.map(getItemById);
  const itemList = await Promise.all(itemPromises);
  return itemList.filter((item): item is Item => !!item);
}

/**
 * Helper for sorting prices from low to high
 * @param items an item[] to sort
 * @returns items[] sorted with price low to high
 */
function sortPriceLowToHighHelper(items: Item[]): Item[] {
  return items.slice().sort((a, b) => a.price - b.price);
}

/**
 * Sorts (master_items, sold_items) tuple price low to high using helper
 * @param itemTuple a (item[], item[]) expressed in the format (master_items, sold_items)
 * @returns a tuple, but with both item lists seperately sorted with price low to high
 *
 * If want to sort a Item[] seperately, make the helper an export function and use that.
 *
 */
export function sortPriceLowToHigh(itemTuple: ItemTuple): ItemTuple {
  if (itemTuple[0] && itemTuple[1]) {
    return [
      sortPriceLowToHighHelper(itemTuple[0]), // Master Items
      sortPriceLowToHighHelper(itemTuple[1]), // Sold Items
    ];
  } else {
    console.log("Invalid ItemTuple entered to sort");
    return [[], []];
  }
}

/**
 * Helper for sorting prices from high to low
 * @param items an item[] to sort
 * @returns items[] sorted with price high to low
 */
function sortByPriceHighToLowHelper(items: Item[]): Item[] {
  return items.slice().sort((a, b) => b.price - a.price);
}

/**
 * Sorts (master_items, sold_items) tuple price high to low using helper
 * @param itemTuple a (item[], item[]) expressed in the format (master_items, sold_items)
 * @returns a tuple, but with both item lists seperately sorted with price high to low
 *
 * If want to sort a Item[] seperately, make the helper an export function and use that.
 *
 */
export function sortByPriceHighToLow(itemTuple: ItemTuple): ItemTuple {
  if (itemTuple[0] && itemTuple[1]) {
    return [
      sortByPriceHighToLowHelper(itemTuple[0]), // Master Items
      sortByPriceHighToLowHelper(itemTuple[1]), // Sold Items
    ];
  } else {
    console.log("Invalid ItemTuple entered to sort");
    return [[], []];
  }
}

/**
 * Helper for sorting timstamps from least recent to most recent
 * @param items an item[] to sort
 * @returns items[] sorted with timstamps from least recent to most recent
 */
function sortLeastToMostRecentHelper(items: Item[]): Item[] {
  return items.slice().sort((a, b) => {
    const aTime = new Date(a.timestamp).getTime();
    const bTime = new Date(b.timestamp).getTime();
    return aTime - bTime;
  });
}

/**
 * Sorts (master_items, sold_items) tuple timstamps from least recent to most recent using helper
 * @param itemTuple a (item[], item[]) expressed in the format (master_items, sold_items)
 * @returns a tuple, but with both item lists seperately sorted with timstamps from least recent
 * to most recent
 *
 * If want to sort a Item[] seperately, make the helper an export function and use that.
 *
 */
export function sortLeastToMostRecent(itemTuple: ItemTuple): ItemTuple {
  if (itemTuple[0] && itemTuple[1]) {
    return [
      sortLeastToMostRecentHelper(itemTuple[0]), // Master Items
      sortLeastToMostRecentHelper(itemTuple[1]), // Sold Items
    ];
  } else {
    console.log("Invalid ItemTuple entered to sort");
    return [[], []];
  }
}

/**
 * Helper for sorting timstamps from most recent to least recent
 * @param items an item[] to sort
 * @returns items[] sorted with timstamps from most recent to least recent
 */
function sortMostToLeastRecentHelper(items: Item[]): Item[] {
  return items.slice().sort((a, b) => {
    const aTime = new Date(a.timestamp).getTime();
    const bTime = new Date(b.timestamp).getTime();
    return bTime - aTime;
  });
}

/**
 * Sorts (master_items, sold_items) tuple timstamps from most recent to least recent using helper
 * @param itemTuple a (item[], item[]) expressed in the format (master_items, sold_items)
 * @returns a tuple, but with both item lists seperately sorted with timstamps from most recent
 * to least recent
 *
 * If want to sort a Item[] seperately, make the helper an export function and use that.
 *
 */
export function sortMostToLeastRecent(itemTuple: ItemTuple): ItemTuple {
  if (itemTuple[0] && itemTuple[1]) {
    return [
      sortMostToLeastRecentHelper(itemTuple[0]), // Master Items
      sortMostToLeastRecentHelper(itemTuple[1]), // Sold Items
    ];
  } else {
    console.log("Invalid ItemTuple entered to sort");
    return [[], []];
  }
}

/**
 * Retrieves an account from database from its object id
 * @param id object id -- if have string of id use new BSON.ObjectId([string]) and make sure
 * BSON is imported from mongodb-stitch-browser-sdk
 *
 * Obejct Id must be a 24 character hex string, 12 byte binary Buffer, or a number
 * or else it will error (for simplicity, we use a 24 character hex string).
 *
 * @returns Account with object id or undefined if error -- no or multiple accounts with id
 */
export async function getAccountById(
  id: BSON.ObjectId
): Promise<Account | undefined> {
  try {
    await client?.auth.loginWithCredential(
      new UserApiKeyCredential(
        "iHXM2LKmwUIPYiBQqQvNOAnAm9QRTV4Qma04bxVp0c4rsszVNTpedtz2j9KIzkYN"
      )
    );

    const db = mongodb?.db("artists_corner_pvd");
    if (!db) {
      throw new Error("Database not available");
    }

    const accountsCollection: RemoteMongoCollection<Account> =
      db.collection("accounts");
    const account: Account[] = await accountsCollection
      .find({
        _id: id,
      })
      .toArray();

    if (account.length === 0) {
      console.error("No account with Object ID");
      return undefined;
    } else if (account.length === 1) {
      return account[0];
    } else {
      console.error("Multiple accounts with Object ID");
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching account by ID:", error);
    return undefined;
  }
}

/**
 * Retrieves an account from database from its username
 * @param username account username/seller username
 * @returns Account with username or undefined if error -- no or multiple accounts with username
 */
export async function getAccountByUsername(
  username: string
): Promise<Account | undefined> {
  try {
    await client?.auth.loginWithCredential(
      new UserApiKeyCredential(
        "iHXM2LKmwUIPYiBQqQvNOAnAm9QRTV4Qma04bxVp0c4rsszVNTpedtz2j9KIzkYN"
      )
    );

    const db = mongodb?.db("artists_corner_pvd");
    if (!db) {
      throw new Error("Database not available");
    }

    const accountsCollection: RemoteMongoCollection<Account> =
      db.collection("accounts");
    const account: Account[] = await accountsCollection
      .find({
        username: username,
      })
      .toArray();

    if (account.length === 0) {
      console.error("No account with username");
      return undefined;
    } else if (account.length === 1) {
      return account[0];
    } else {
      console.error("Multiple accounts with username");
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching account by username:", error);
    return undefined;
  }
}

/**
 * Returns is username already exists in database -- use when creating a new account,
 * checking if username doesn't already exist
 * @param username string want to check if already username of another account
 * @returns boolean of if username already being used
 */
export async function ifUsernameAlreadyExists(
  username: string
): Promise<boolean> {
  try {
    await client?.auth.loginWithCredential(
      new UserApiKeyCredential(
        "iHXM2LKmwUIPYiBQqQvNOAnAm9QRTV4Qma04bxVp0c4rsszVNTpedtz2j9KIzkYN"
      )
    );

    const db = mongodb?.db("artists_corner_pvd");
    if (!db) {
      throw new Error("Database not available");
    }

    const accountsCollection: RemoteMongoCollection<Account> =
      db.collection("accounts");
    const account: Account | null = await accountsCollection.findOne({
      username: username,
    });

    return account != null;
  } catch (error) {
    console.error("Error fetching account by username:", error);
    return false;
  }
}

/**
 * Inserts new item into master_items collection
 * @param title of new item
 * @param description of new item
 * @param seller username of new item
 * @param category of new item
 * @param subcategory of new item
 * @param price of new item
 * @param photoFilenames string[] of new item
 *
 * USE CAREFULLY WHEN TESTING, DELETE ALL ITEMS THAT YOU ADD
 * TO KEEP MOCKING CONSISTENT
 */
export async function insertNewItem(
  title: string,
  description: string,
  seller: string,
  category: string,
  subcategory: string,
  price: number,
  photoFilenames: string[]
): Promise<void> {
  try {
    await client?.auth.loginWithCredential(
      new UserApiKeyCredential(
        "iHXM2LKmwUIPYiBQqQvNOAnAm9QRTV4Qma04bxVp0c4rsszVNTpedtz2j9KIzkYN"
      )
    );

    const db = mongodb?.db("artists_corner_pvd");
    if (!db) {
      throw new Error("Database not available");
    }

    const itemsCollection: RemoteMongoCollection<Item> =
      db.collection("master_items");

    const newItem: Item = {
      title: title,
      description: description,
      seller: seller,
      category: category,
      subcategory: subcategory,
      price: price,
      timestamp: new Date(), // Date returns current time
      photoFilenames: photoFilenames,
      ifSold: false,
    };

    const result = await itemsCollection.insertOne(newItem);
    console.log(`Successfully inserted item with _id: ${result.insertedId}`);
  } catch (error) {
    console.error("Failed to insert item:", error);
  }
}

/**
 * Inserts new account into accounts collection
 * @param username of new account -- first check if username already available 
 * before call this function
 * @param fullname of new account
 * @param email of new account -- use brown email
 * @param bio of new account
 * @param profilePhotoFilename of new account
 * @param contactInformation of new account -- ALWAYS INCLUDE "EMAIL":EMAIL   
 * KEY:VALUE PAIR, IF USER DOES NOT INCLUDE ANY EXTRAS
 * 
 * Include multiple slots, for each drop down menu of options including instagram, 
 * phone number, facebook, twitter, etc. but have email as already included and 
 * non-modifiable
 * 
 * AGAIN, USE CAREFULLY WHEN TESTING, DELETE ALL AACOUNTS THAT YOU ADD
 * TO KEEP MOCKING CONSISTENT
 * 
 */
export async function insertNewAccount(
  username: string,
  fullname: string,
  email: string,
  bio: string,
  profilePhotoFilename: string,
  contactInformation: Map<String, String> 
): Promise<void> {
  try {
    await client?.auth.loginWithCredential(
      new UserApiKeyCredential(
        "iHXM2LKmwUIPYiBQqQvNOAnAm9QRTV4Qma04bxVp0c4rsszVNTpedtz2j9KIzkYN"
      )
    );

    const db = mongodb?.db("artists_corner_pvd");
    if (!db) {
      throw new Error("Database not available");
    }

    const accountsCollection: RemoteMongoCollection<Account> =
      db.collection("accounts");

    const newAccount: Account = {
         username: username,
         fullname: fullname,
         email: email,
         bio: bio,
         currentListing_ids: [],
         pastListing_ids: [],
         purchasedItem_ids: [],
         likedItem_ids: [],
         profilePhotoFilename: profilePhotoFilename,
         contactInformation: contactInformation,
    };

    const result = await accountsCollection.insertOne(newAccount);
    console.log(`Successfully inserted account with _id: ${result.insertedId}`);
  } catch (error) {
    console.error("Failed to insert account:", error);
  }
}

/**
 * Removes an account from the collection based on its object ID
 * @param accountId The object Id of the account to be removed
 * @returns True if the removal is successful, false otherwise
 */
export async function deleteAccountById(accountId: BSON.ObjectId): Promise<void> {
    try {
      // Ensure the client is authenticated
      await client?.auth.loginWithCredential(
        new UserApiKeyCredential(
          "iHXM2LKmwUIPYiBQqQvNOAnAm9QRTV4Qma04bxVp0c4rsszVNTpedtz2j9KIzkYN"
        )
      );
  
      const db = mongodb?.db('artists_corner_pvd');
      if (!db) {
        throw new Error('Database not available');
      }
  
      const accountsCollection: RemoteMongoCollection<Account> = db.collection('accounts');
  
      // Remove the account based on its object ID
      const result = await accountsCollection.deleteOne({ _id: accountId });
  
      // Check if the deletion was successful
      if (result.deletedCount === 1) {
        console.log(`Account with Id ${accountId} removed from the collection.`);
      } else {
        console.error(`Failed to remove account with Id ${accountId} from the collection.`);
      }
    } catch (error) {
      console.error('Error removing account:', error);
    }
  }

/**
 * Add functions for:
 * add item/add account
 * remove item -- add to sold/remove account
 */
