window.global = window;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import CategoryPage from "./CategoryPage";
import ItemDetailPage from "./ItemDetailPage";
import SearchPage from "./SearchPage"
import SellerPage from "./SellerPage";
import "../styles/home.css";

import { initializeStitchClient } from "../mongo/Mongo-Functions";

function App() {
  initializeStitchClient();
  const [searchString, setSearchString] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchString(event.target.value);
  };

  return (
    <Router>
      <div className="header">
      <Link to="/" style={{ color: "#303030" }}>
       Artist's Corner PVD 🌈🐻
        </Link>
        
        <div className="search-container">
          <form action="/search" style={{ display: "flex", alignItems: "center" }}>
            <input
            type="text"
            placeholder="Search..."
            name="keyword"
            value={searchString}
            onChange={handleSearchInputChange}
            style={{ width: "600px"}} // Adjust the width and margin as needed
          />
          <button type="submit">
              <i className="fa fa-search">Search</i>
            </button>          
          </form>
          </div>
      </div>

      <div className="topnav">
        <div className="main-links" style={{marginLeft: "10rem"}}>
          <Link to="/category/Accessories">Accessories</Link>
          <Link to="/category/Clothing">Clothing</Link>
          <Link to="/category/Art">Art</Link>
          <Link to="/category/Crafts">Crafts</Link>
          {/* <Link to="/events">Events</Link> */}
          <Link to="/about">About</Link>
        </div>
      </div>
      

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/item/:itemId" element={<ItemDetailPage />} />
        <Route path={`/search`} element={<SearchPage 
          searchString={searchString}
          />} />
        <Route path="/user/:username" element={<SellerPage />} />{" "}
      </Routes>

      <div className="footer">
        <p style={{ fontSize: "0.9rem" }}>
          Copyright © 2023 Artist's Corner PVD.&nbsp; Made with ❤️ in
          Providence.
        </p>
      </div>
    </Router>
  );
}

export default App;
