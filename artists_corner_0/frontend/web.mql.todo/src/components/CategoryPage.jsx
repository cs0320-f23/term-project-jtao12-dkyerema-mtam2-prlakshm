import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getItemsByCategory } from "../mongo/Mongo-Functions";
import ItemComponent from "./ItemComponent";
import "../styles/styles.css";
import "../styles/images.css";


const CategoryPage = () => {
  const { categoryName } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItemsByCategory(categoryName)
      .then(([masterItems, soldItems]) => {
        const combinedItems = [...masterItems, ...soldItems];
        console.log("Items:", combinedItems); // Check the structure of items
        setItems(combinedItems);
      })
      .catch(console.error);
  }, [categoryName]);

  return (
      <div style={{ display: 'flex' }}>
        {/* Left side (Filter by section) */}
        <div class="side-text-container">
          <div class="side-text">
            <p>Filter by:</p>
            <p>Jewelry</p>
            <p>Hats</p>
            <p>Bags</p>
            <p>Belts</p>
            <p>Others</p>
          </div>
        </div>
  
        {/* Right side (Category items) */}
        <section class="category-container">
          <h1>{categoryName}</h1> <hr />
          {items.map((item) => (
            <ItemComponent key={item._id} item={item} />
          ))}
        </section>
      </div>
    );
  };
export default CategoryPage;


