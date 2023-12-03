import React, { useEffect, useState } from 'react';
import { getAllItems, ItemTuple } from "./crud-read"; // Replace with the correct path

/**
 * This is the highest level component!
 */
function App() {
  const [items, setItems] = useState<ItemTuple>([[], []]);

  useEffect(() => {
    // Fetch items when the component mounts
    getAllItems()
      .then((fetchedItems) => setItems(fetchedItems))
      .catch((error) => console.error('Error fetching items:', error));
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <div className="App">
      <p className="App-header">
        <h1>Artist's Corner Pvd</h1>
      </p>
      <div>
        <h2>Master Items</h2>
        <p>{JSON.stringify(items[0], null, 2)}</p>
      </div>
      <div>
        <h2>Sold Items</h2>
        <p>{JSON.stringify(items[1], null, 2)}</p>
      </div>
    </div>
  );
}

export default App;
