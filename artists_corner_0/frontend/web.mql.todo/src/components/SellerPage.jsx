import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAccountByUsername, getItemById } from "../mongo/Mongo-Functions";
import ItemComponent from "./ItemComponent";
import "../styles/category.css";

const SellerPage = () => {
  const { username } = useParams();
  const [currentItems, setCurrentItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);

  const fetchItems = async (itemIds) => {
    return Promise.all(itemIds.map((id) => getItemById(id)));
  };

  useEffect(() => {
    getAccountByUsername(username)
      .then((account) => {
        if (account) {
          // Fetch current items
          const fetchCurrentItems = fetchItems(account.currentListing_ids);
          // Fetch sold items
          const fetchSoldItems = fetchItems(account.pastListing_ids);

          return Promise.all([fetchCurrentItems, fetchSoldItems]);
        } else {
          throw new Error("Seller account not found");
        }
      })
      .then(([fetchedCurrentItems, fetchedSoldItems]) => {
        setCurrentItems(fetchedCurrentItems.filter((item) => item));
        setSoldItems(fetchedSoldItems.filter((item) => item));
      })
      .catch((error) => {
        console.error("Error fetching seller's items:", error);
      });
  }, [username]);

  return (
    <div className="category-page-container">
      <h1>{username}'s Shop</h1>

      {currentItems.length > 0 && (
        <>
          <h2>Current Listings</h2>
          <div className="items-grid">
            {currentItems.map((item) => (
              <ItemComponent key={item._id} item={item} />
            ))}
          </div>
        </>
      )}

      {soldItems.length > 0 && (
        <>
          <h2>Sold Items</h2>
          <div className="items-grid">
            {soldItems.map((item) => (
              <ItemComponent key={item._id} item={item} />
            ))}
          </div>
        </>
      )}

      {currentItems.length === 0 && soldItems.length === 0 && (
        <p>No items found for this seller.</p>
      )}
    </div>
  );
};

export default SellerPage;
