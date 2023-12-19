import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getItemsByCategory,
  getItemsBySubcategory,
} from "../mongo/Mongo-Functions";
import ItemComponent from "./ItemComponent";
import "../styles/category.css";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [items, setItems] = useState([]);
  const [subcategories, setSubcategories] = useState(new Set());
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const fetchItems = async () => {
    try {
      const [masterItems, soldItems] = await getItemsByCategory(categoryName);
      const combinedItems = [...masterItems, ...soldItems];
      setItems(combinedItems);

      // Extract and set subcategories
      const subcategoriesSet = new Set(
        combinedItems.map((item) => item.subcategory)
      );
      setSubcategories(subcategoriesSet);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [categoryName]);

  const handleSubcategoryClick = async (subcategory) => {
    setSelectedSubcategory(subcategory);
    if (subcategory) {
      const [masterItems, soldItems] = await getItemsBySubcategory(subcategory);
      setItems([...masterItems, ...soldItems]);
    } else {
      fetchItems(); // Reset to all items in the category
    }
  };

  return (
    <div className="category-page-container">
      <h1>{categoryName}</h1>
      <div data-testid="subcategory-tags" className="subcategory-tags">
        {[...subcategories].map((subcat) => (
          <button
            key={subcat}
            aria-label={subcat}
            title={subcat}
            className={`tag ${
              selectedSubcategory === subcat ? "selected" : ""
            }`}
            onClick={() => handleSubcategoryClick(subcat)}
          >
            {subcat}
          </button>
        ))}
        {selectedSubcategory && (
          <button
            className="reset-filter"
            onClick={() => handleSubcategoryClick("")}
          >
            Reset Filter
          </button>
        )}
      </div>
      <div className="items-grid">
        {items.map((item) => (
          <ItemComponent key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
