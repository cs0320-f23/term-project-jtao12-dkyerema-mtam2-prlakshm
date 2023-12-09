//App.tsx
import { useEffect, useState } from "react";
import {
  ItemTuple,
  searchItems,
  getItemById,
  sortLeastToMostRecent,
  sortMostToLeastRecent,
  initializeStitchClient,
} from "../mongo/Mongo-Functions";
import Item from "../models/item";
import { BSON } from "mongodb-stitch-browser-sdk";

/**
 * This is the highest level component!
 */
function App() {
  const [items, setItems] = useState<ItemTuple>([[], []]);
  const [itemById, setItemById] = useState<Item>();

  initializeStitchClient();

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
    searchItems("Emily")
      .then(([masterItems, soldItems]) => {
        setItems(sortMostToLeastRecent([masterItems || [], soldItems || []]));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <div className="App">
      <h1>Artist's Corner Pvd</h1>
      {/*formatted as bullet point list to make it easier to check items seperately*/}
      <div>
        <h2>Item By Id</h2>
        <ul>
          <li>Item: {JSON.stringify(itemById)}</li>
        </ul>
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
    </div>
  );
}

export default App;
