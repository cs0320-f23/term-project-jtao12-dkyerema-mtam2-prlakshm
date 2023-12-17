import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemsByCategory } from "../mongo/Mongo-Functions"; // Adjust the import path

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const fetchedItems = await getItemsByCategory(categoryName);
        setItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [categoryName]);

  return (
    <div className="main-content">
      <h2>{categoryName}</h2>
      {/* Render items here */}
      {items.map((item, index) => (
        <div key={index}>{/* Render each item */}</div>
      ))}
    </div>
  );
};

export default CategoryPage;
