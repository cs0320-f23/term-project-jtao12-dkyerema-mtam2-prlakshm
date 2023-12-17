// function App() {
//     return (
//     <div className="App">
//     <header className="App-header">
//       <h1>Helloooo</h1>
//     </header>
//     </div>
//     );
//   }
  
//   export default App;

/// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { HomePage, UserPage, ItemPage } from './Page';

// http://localhost:5173/home-page.html exists, but clicking "home" doesn't load it
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="home-page.html">Home</Link> 
            </li>
            <li>
              <Link to="/user">User Page</Link>
            </li>
            <li>
              <Link to="/item">Item Page</Link>
            </li>
          </ul>
        </nav>

        <Routes> 
          <Route path="/home-page.html" element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/item" element={<ItemPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
