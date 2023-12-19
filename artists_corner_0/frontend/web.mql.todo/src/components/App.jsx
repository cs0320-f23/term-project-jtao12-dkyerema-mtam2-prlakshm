window.global = window;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import CategoryPage from "./CategoryPage";
import ItemDetailPage from "./ItemDetailPage";
import SellerPage from "./SellerPage";
import "../styles/home.css";

import { initializeStitchClient } from "../mongo/Mongo-Functions";

function App() {
  initializeStitchClient();
  return (
    <Router>
      <div className="header">
        <Link to="/" style={{ color: "#303030" }}>
          Artist's Corner PVD
        </Link>
        <div className="search-container">
          <form action="/action_page.php">
            <input type="text" placeholder="Search..." name="search" />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
      </div>
      <div className="topnav">
        <div className="right-links">
          <Link to="/category/Accessories">Accessories</Link>
          <Link to="/category/Clothing">Clothing</Link>
          <Link to="/category/Art">Art</Link>
          <Link to="/category/Crafts">Crafts</Link>
          <Link to="/events">Events</Link>
          <Link to="/about">About</Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/item/:itemId" element={<ItemDetailPage />} />
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
