import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getItemsByCategory } from "../mongo/Mongo-Functions";
import ItemComponent from "./ItemComponent";

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
    <div>
      <h1>{categoryName}</h1>
      {items.map((item) => (
        <ItemComponent key={item._id} item={item} />
      ))}
    </div>
  );
};

export default CategoryPage;
