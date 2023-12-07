// import { Stitch, RemoteMongoClient, UserApiKeyCredential } from "mongodb-stitch-browser-sdk";

// const appId = "artists_corner_0-lcspi"; // Replace with your actual Stitch app ID
// const client = Stitch.initializeDefaultAppClient(appId);
// const mongodb = client.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");

// export const printAll = async () => {
//   try {
//     await client.auth.loginWithCredential(new UserApiKeyCredential("iHXM2LKmwUIPYiBQqQvNOAnAm9QRTV4Qma04bxVp0c4rsszVNTpedtz2j9KIzkYN"));

//     const db = mongodb.db("artists_corner_pvd");

//     const masterColl = db.collection("master_items");
//     const masterCursor = masterColl.find();
//     const masterItems = await masterCursor.toArray();
//     console.log("Master Items:", masterItems);

//     const soldColl = db.collection("sold_items");
//     const soldCursor = soldColl.find();
//     const soldItems = await soldCursor.toArray();
//     console.log("Sold Items:", soldItems);
//   } catch (error) {
//     console.error("Error:", error);
//   } finally {
    
//   }
// };

// printAll();
