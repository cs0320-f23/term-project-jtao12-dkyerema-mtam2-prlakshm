import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { getItemsByCategory } from "../mongo/Mongo-Functions";
import ItemComponent from "./ItemComponent";

const CategoryPage = () => {
  const { categoryName } = useParams(); // Access the category from the URL
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItemsByCategory(categoryName)
      .then((fetchedItems) => {
        setItems(fetchedItems);
      })
      .catch(console.error);
  }, [categoryName]); // Rerun when categoryName changes

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
