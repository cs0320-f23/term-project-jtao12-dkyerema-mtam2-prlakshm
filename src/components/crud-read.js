// crud-read.js
import { password } from "../private/password.js";
import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://prlakshm:" + password + "@cs32term.vhg1g58.mongodb.net/";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("artists_corner_pvd");
    
    const masterColl = db.collection("master_items");
    const masterCursor = masterColl.find();
    await masterCursor.forEach(console.log);

    const soldColl = db.collection("sold_items");
    const soldCursor = soldColl.find();
    await soldCursor.forEach(console.log);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

run();
