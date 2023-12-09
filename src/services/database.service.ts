// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: {
  master_items?: mongoDB.Collection;
  sold_items?: mongoDB.Collection;
  accounts?: mongoDB.Collection;
} = {};

// Initialize Connection
export async function connectToDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING!
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const masterItemsCollection: mongoDB.Collection = db.collection(
    process.env.MASTER_ITEMS_COLL!
  );
  const soldItemsCollection: mongoDB.Collection = db.collection(
    process.env.SOLD_ITEMS_COLL!
  );
  const accountsCollection: mongoDB.Collection = db.collection(
    process.env.ACCOUNTS_COLL!
  );

  collections.master_items = masterItemsCollection;
  collections.sold_items = soldItemsCollection;
  collections.accounts = accountsCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${masterItemsCollection.collectionName}, 
    ${soldItemsCollection.collectionName}, and ${accountsCollection.collectionName}`
  );
}
