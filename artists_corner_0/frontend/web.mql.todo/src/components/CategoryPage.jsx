import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getItemsByCategory } from "../mongo/Mongo-Functions";
import ItemComponent from "./ItemComponent";
import "../styles/category.css";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItemsByCategory(categoryName)
      .then(([masterItems, soldItems]) => {
        const combinedItems = [...masterItems, ...soldItems];
        setItems(combinedItems);
      })
      .catch(console.error);
  }, [categoryName]);

  return (
    <div className="category-page-container">
      <h1>{categoryName}</h1>
      <div className="items-grid">
        {items.map((item) => (
          <ItemComponent key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
