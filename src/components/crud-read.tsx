// crud-read.tsx
import { password } from "../private/password";
import { MongoClient, Collection } from "mongodb";

export type Item = {
  _id: {
    $oid: string;
  };
  title: string;
  description: string;
  seller: {
    $oid: string;
  };
  category: string;
  subcategory: string;
  price: number;
  timestamp: Date;
  photoFilenames: string[];
  ifSold: boolean;
};

export type ItemTuple = [Item[], Item[]] | [];

export async function getAllItems(): Promise<ItemTuple> {
  const uri = "mongodb+srv://prlakshm:" + password + "@cs32term.vhg1g58.mongodb.net/";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("artists_corner_pvd");

    const masterItemsCollection: Collection<Item> = db.collection("master_items");
    const masterItemsCursor = masterItemsCollection.find();
    const master_Items: Item[] = await masterItemsCursor.toArray();

    const soldItemsCollection: Collection<Item> = db.collection("sold_items");
    const soldItemsCursor = soldItemsCollection.find();
    const sold_Items: Item[] = await soldItemsCursor.toArray();

    return [master_Items, sold_Items];
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  } finally {
    await client.close();
  }
}

getAllItems().then(([masterItems, soldItems]) => {
  console.log("Master Items:", masterItems);
  console.log("Sold Items:", soldItems);
}).catch((error) => {
  console.error("Error:", error);
});