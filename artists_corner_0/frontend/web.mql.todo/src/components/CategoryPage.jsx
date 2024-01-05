import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getItemsByCategory,
  sortPriceLowToHigh,
  sortByPriceHighToLow,
  sortMostToLeastRecent,
  sortLeastToMostRecent,
  getItemsByCategoryAndSubcategory,
} from "../mongo/Mongo-Functions";
import ItemComponent from "./ItemComponent";
import "../styles/category.css";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [currentItems, setCurrentItems] = useState([]);
  const [subcategories, setSubcategories] = useState(new Set());
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedSort, setSelectedSort] = useState([]);

  const fetchItems = async () => {
    try {
      const [masterItems, soldItems] = await getItemsByCategory(categoryName);
      const combinedItems = [...masterItems, ...soldItems];
      setCurrentItems(combinedItems);

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
    setCurrentItems(currentItems);
  }, [selectedSort, currentItems]);

  const handleSubcategoryClick = async (subcategory) => {
    setSelectedSubcategory(subcategory);
    if (subcategory) {
      const [masterItems, soldItems] = await getItemsByCategoryAndSubcategory(
        categoryName,
        subcategory
      );
      setCurrentItems([...masterItems, ...soldItems]);
    } else {
      fetchItems(); // Reset to all items in the category
    }
  };

  const handleSort = async (selectedValue) => {
    setSelectedSort(selectedValue);
    if (selectedValue !== "reset") {
      sortItemsByOption(selectedValue);
    } else {
      fetchItems();
    }
  };

  const sortItemsByOption = async (sort) => {
    const [masterItems, soldItems] = await getItemsByCategory(categoryName);
    let combinedItems = [];

    switch (sort) {
      case "lowToHigh":
        combinedItems = sortPriceLowToHigh([masterItems, soldItems]);
        break;

      case "highToLow":
        combinedItems = sortByPriceHighToLow([masterItems, soldItems]);
        break;

      case "mostRecent":
        combinedItems = sortMostToLeastRecent([masterItems, soldItems]);
        break;

      case "leastRecent":
        combinedItems = sortLeastToMostRecent([masterItems, soldItems]);
        break;

      default:
        return [masterItems, soldItems];
    }

    const [filtMasterItems, filtSoldItems] = combinedItems;
    setCurrentItems([...filtMasterItems, ...filtSoldItems]);

    return combinedItems;
  };

  return (
    <div className="category-page-container">
      <h1>{categoryName}</h1>
      <div className="sort-dropdown">
        <select
          value={selectedSort}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="reset">Reset Sort</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
          <option value="mostRecent">Most Recent</option>
          <option value="leastRecent">Least Recent</option>
        </select>
      </div>
      <div className="subcategory-items-container">
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
              reset filter
            </button>
          )}
        </div>
        <div className="items-grid">
          {currentItems.map((item) => (
            <ItemComponent key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
