// Mongo-Functions.ts
import {
  Stitch,
  RemoteMongoClient,
  UserApiKeyCredential,
  RemoteMongoCollection,
  StitchAppClient,
  RemoteFindOptions,
} from "mongodb-stitch-browser-sdk";
import Item from "../models/item";
import { ObjectId } from "mongodb";

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
 * @param id object id -- if have string of id use new ObjectId([string]) and make sure ObjectId
 * is imported from mongodb
 * @returns Item with object id or null if error -- no or multiple items with id
 */
export async function getItemById(id: ObjectId): Promise<Item | undefined> {
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
    const masterItem: Item | null = await masterItemsCollection.findOne({
      _id: id,
    });

    const soldItemsCollection: RemoteMongoCollection<Item> =
      db.collection("sold_items");
    const soldItem: Item | null = await soldItemsCollection.findOne({
      _id: id,
    });

    if (!masterItem && !soldItem) {
      console.error("No item with Object ID");
      return undefined;
    } else if (masterItem && !soldItem) {
      return masterItem;
    } else if (soldItem && !masterItem) {
      return soldItem;
    } else {
      console.error("Multiple items with Object ID");
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching item by ID:", error);
    return undefined;
  }
}

function sortPriceLowToHighHelper(items: Item[]): Item[] {
  return items.slice().sort((a, b) => a.price - b.price);
}

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
function sortByPriceHighToLowHelper(items: Item[]): Item[] {
  return items.slice().sort((a, b) => b.price - a.price);
}

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


function sortLeastToMostRecentHelper(items: Item[]): Item[] {
    return items.slice().sort((a, b) => {
        const aTime = new Date(a.timestamp).getTime();
        const bTime = new Date(b.timestamp).getTime();
        return aTime - bTime;
      });
  }
  
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
  function sortMostToLeastRecentHelper(items: Item[]): Item[] {
    return items.slice().sort((a, b) => {
        const aTime = new Date(a.timestamp).getTime();
        const bTime = new Date(b.timestamp).getTime();
        return bTime - aTime;
      });
  }
  
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
 * Add functions for:
 * filter by price, timestamp from [item[], item[]]
 * accounts get by id, get by username
 * item get by id
 * if username already exists
 * add item/add account
 * remove item -- add to sold/remove account
 */
