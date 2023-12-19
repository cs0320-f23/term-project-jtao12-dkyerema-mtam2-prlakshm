//App.tsx
import { useEffect, useState } from "react";
import {
  ItemTuple,
  searchItems,
  getItemById,
  sortMostToLeastRecent,
  initializeStitchClient,
  getItemListById,
  getAccountByUsername,
  insertNewItem,
  insertNewAccount,
  addItemToLikedListings,
  updateAccount,
  markItemAsSold,
  getAllUsernames,
} from "../mongo/Mongo-Functions";
import Item from "../models/item";
import { BSON } from "mongodb-stitch-browser-sdk";
import Account from "../models/account";

/**
 * This is the highest level component!
 */
function App() {
  const [items, setItems] = useState<ItemTuple>([[], []]);
  const [itemById, setItemById] = useState<Item>();
  const [accountById, setAccountById] = useState<Account>();
  const [currentListings, setCurrentListings] = useState<Item[]>([]);

  initializeStitchClient();

  // useEffect(() => {
  //   insertNewAccount(
  //     'Barbara',
  //     'Account Full Name',
  //     "Account Email",
  //     "Account Bio",
  //     "photo1.png",
  //     new Map([["email","Account Email"]])
  //    );
  // }, []);

  // useEffect(() => {
  //   insertNewItem(
  //     'Item Title',
  //     'Item Description',
  //     "Barbara",
  //     "Item Category",
  //     "Item Subcategory",
  //     19.00,
  //     ["photo1.png", "photo2.jpeg"]
  //   );
  // }, []);

  // useEffect(() => {markItemAsSold(new BSON.ObjectId("657644bc678b57b4cf5572d1"))}, []);

  useEffect(() => {
    getItemById(new BSON.ObjectId("656bb25aabfe68217e3eb93f"))
      .then((item) => {
        setItemById(item);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  useEffect(() => {
    searchItems("Item Title")
      .then(([masterItems, soldItems]) => {
        setItems(sortMostToLeastRecent([masterItems || [], soldItems || []]));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  useEffect(() => {
    getAccountByUsername("Sophia_Cheng")
      .then((account) => {
        setAccountById(account);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  useEffect(() => {
    if (accountById?.currentListing_ids) {
      getItemListById(accountById.currentListing_ids)
        .then((itemList) => {
          setCurrentListings(itemList);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [accountById?.currentListing_ids]); //this is a dependency YOU MUST use--otherwise takes long to fetch

  return (
    <div className="App">
      <h1>Artist's Corner Pvd</h1>
      {/*formatted as bullet point list to make it easier to check items seperately*/}
      <div>
        <h2>Item By Id</h2>
        <ul>
          <li>Item: {JSON.stringify(itemById)}</li>
        </ul>
      </div>

      <div>
        <h2>Master Items</h2>
        <ul>
          {items[0]?.map((item, index) => (
            <li key={index}>Item: {JSON.stringify(item)}</li>
          ))}
        </ul>
      </div>

      {/*formatted as bullet point list to make it easier to check items seperately*/}
      <div>
        <h2>Sold Items</h2>
        <ul>
          {items[1]?.map((item, index) => (
            <li key={index}>Item: {JSON.stringify(item)}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Account By Id</h2>
        <ul>
          <li>Account: {JSON.stringify(accountById)}</li>
        </ul>
      </div>

      <div>
        <h2>Account Current Listings</h2>
        <ul>
          {currentListings.map((listing, index) => (
            <li key={index}>Item: {JSON.stringify(listing)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
