import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getItemsByCategory,
  getItemsBySubcategory,
  sortPriceLowToHigh,
  sortByPriceHighToLow,
  sortMostToLeastRecent,
  sortLeastToMostRecent
} from "../mongo/Mongo-Functions";
import ItemComponent from "./ItemComponent";
import "../styles/category.css";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [currentItems, setCurrentItems] = useState([]);
  const [subcategories, setSubcategories] = useState(new Set());
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedFilter, setSelectedFilter] = useState([]);
  // const [originalItems, setOriginalItems] = useState([]); // Represents the original unsorted items.


  const fetchItems = async () => {
    try {
      const [masterItems, soldItems] = await getItemsByCategory(categoryName);
      const combinedItems = [...masterItems, ...soldItems];
      setCurrentItems(combinedItems);

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

  useEffect(() => {
    if (selectedFilter) {
      console.log("selected filter:" + selectedFilter)
      console.log("current items:" + currentItems)

      const sortedItems = sortItemsByOption(selectedFilter, currentItems);
      setCurrentItems(sortedItems);
    } else {
      setCurrentItems(currentItems);
    }
  }, [selectedFilter, currentItems]);

  const handleSubcategoryClick = async (subcategory) => {
    setSelectedSubcategory(subcategory);
    if (subcategory) {
      const [masterItems, soldItems] = await getItemsBySubcategory(subcategory);
      setCurrentItems([...masterItems, ...soldItems]);
    } else {
      fetchItems(); // Reset to all items in the category
    }
  };

const handleSort = async () => {
  if (selectedFilter) {
    const sortedItems = sortItemsByOption(selectedFilter, currentItems);
    setCurrentItems(sortedItems);
    
  } else {
    fetchItems();
  }
};
  
  const sortItemsByOption = (filter, items) => {
    switch (filter) {
      case "lowToHigh":
        return [
          sortPriceLowToHigh(items[0]), // Sort master items
          sortPriceLowToHigh(items[1]), // Sort sold items
        ];
      case "highToLow":
        return [
          sortByPriceHighToLow(items[0]), // Sort master items
          sortByPriceHighToLow(items[1]), // Sort sold items
        ];
      case "mostRecent":
        return [
          sortMostToLeastRecent(items[0]), // Sort master items
          sortMostToLeastRecent(items[1]), // Sort sold items
        ];
      case "leastRecent":
        return [
          sortLeastToMostRecent(items[0]), // Sort master items
          sortLeastToMostRecent(items[1]), // Sort sold items
        ];
      default:
        return items;
    }
  };
  
  

  return (
    <div className="category-page-container">
      <h1>{categoryName}</h1>
      <div className="subcategory-tags">
        {[...subcategories].map((subcat) => (
          <button
            key={subcat}
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

        {[
          { label: "low to high", value: "lowToHigh" },
          { label: "high to low", value: "highToLow" },
          { label: "most recent", value: "mostRecent" },
          { label: "least recent", value: "leastRecent" },
        ].map((filter) => (
          <button
            key={filter.value}
            className={`filter-tag ${
              selectedFilter === filter.value ? "selected" : ""
            }`}
            onClick={() => setSelectedFilter(filter.value)}
            // onClick={() => handleSort()}
            >
            {filter.label}
          </button>
        ))}

        {selectedSubcategory && (
          <button
            className="reset-filter"
            onClick={() => handleSubcategoryClick("")}
          >
            Sort By
          </button>
        )}
      </div>
      <div className="items-grid">
        {currentItems.map((item) => (
          <ItemComponent key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
