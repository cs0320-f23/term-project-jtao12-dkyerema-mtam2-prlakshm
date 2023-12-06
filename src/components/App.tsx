import { getAllItems } from "../mongo/test-read-types";
/**
 * This is the highest level component!
 */
function App() {


  return (
    <div className="App">
      <p className="App-header">
        <h1>Artist's Corner Pvd</h1>
      </p>

      <p>{JSON.stringify(getAllItems())}</p>
      
    </div>
  );
}

export default App;