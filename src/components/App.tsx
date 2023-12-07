//import { printAll } from "../mongo/test-read-java";
import { useEffect, useState } from "react";
import { ItemTuple, getAllItems } from "../mongo/test-read-types";
/**
 * This is the highest level component!
 */
function App() {

  const [items, setItems] = useState<ItemTuple>([[],[]]);

  useEffect(() => {
    getAllItems()
      .then(([masterItems, soldItems]) => {
        console.log("Master Items:", masterItems);
        console.log("Sold Items:", soldItems);
        setItems([masterItems || [], soldItems || []]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []); 
  return (
    <div className="App">
      <p className="App-header">
        <h1>Artist's Corner Pvd</h1>
      </p>
      
    </div>
  );
}

export default App;