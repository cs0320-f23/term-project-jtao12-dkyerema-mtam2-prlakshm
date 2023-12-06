import { getAllItems } from "../mongo/test-read-types";
/**
 * This is the highest level component!
 */
function App() {

  getAllItems();

  return (
    <div className="App">
      <p className="App-header">
        <h1>Artist's Corner Pvd</h1>
      </p>
      
    </div>
  );
}

export default App;