import { useEffect, useState } from "react";
import { ItemTuple, getAllItems } from "../mongo/test-read-types";
/**
 * This is the highest level component!
 */
function App() {
  const [items, setItems] = useState<ItemTuple>([[], []]);

  useEffect(() => {
    getAllItems()
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
      <p>{JSON.stringify(items)}</p>
    </div>
  );
}

export default App;
