//App.tsx
import { useEffect, useState } from "react";
import {
  ItemTuple,
  searchItems,
  initializeStitchClient,
} from "../mongo/Mongo-Functions";


/**
 * This is the highest level component!
 */

function App() {
  const [items, setItems] = useState<ItemTuple>([[], []]);

  initializeStitchClient();

  useEffect(() => {
    searchItems("emily")
      .then(([masterItems, soldItems]) => {
        setItems([masterItems || [], soldItems || []]);
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
        <h2>Master Items</h2>
        <ul>
          {items[0]?.map((item, index) => (
            <li key={index}>
              Item: {JSON.stringify(item)}
            </li>
          ))}
        </ul>
      </div>
  
      {/*formatted as bullet point list to make it easier to check items seperately*/}
      <div>
        <h2>Sold Items</h2>
        <ul>
          {items[1]?.map((item, index) => (
            <li key={index}>
              Item: {JSON.stringify(item)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
}

export default App;
