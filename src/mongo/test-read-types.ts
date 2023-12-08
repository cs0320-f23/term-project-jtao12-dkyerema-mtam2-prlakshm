import {
  Stitch,
  RemoteMongoClient,
  UserApiKeyCredential,
  RemoteMongoCollection,
  StitchAppClient,
} from "mongodb-stitch-browser-sdk";
import Item from "../models/item";

export type ItemTuple = [Item[], Item[]] | [];

let client: StitchAppClient | undefined;
let mongodb: RemoteMongoClient | undefined;

export const initializeStitchClient = () => {
  if (!client) {
    const appId = "artists_corner_0-lcspi";
    client = Stitch.hasAppClient(appId)
      ? Stitch.getAppClient(appId)
      : Stitch.initializeAppClient(appId);
    
    mongodb = client.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  }
};

export async function getAllItems(): Promise<ItemTuple> {
  initializeStitchClient();

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

    const masterItemsCollection: RemoteMongoCollection<Item> = db.collection("master_items");
    const masterItemsCursor = masterItemsCollection.find();
    const master_Items: Item[] = await masterItemsCursor.toArray();

    const soldItemsCollection: RemoteMongoCollection<Item> = db.collection("sold_items");
    const soldItemsCursor = soldItemsCollection.find();
    const sold_Items: Item[] = await soldItemsCursor.toArray();

    return [master_Items, sold_Items];
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}
