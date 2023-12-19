import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  searchItems,
  getItemsBySubcategory,
  sortPriceLowToHigh,
  sortByPriceHighToLow,
  sortMostToLeastRecent,
  sortLeastToMostRecent,
} from "../mongo/Mongo-Functions";
import ItemComponent from "./ItemComponent";
import "../styles/category.css";


const SearchPage = ({ searchString, searchClicked }) => {
  console.log("search string:" + searchString)
  const { categoryName } = useParams();
  const [subcategories, setSubcategories] = useState(new Set());
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const [currentItems, setCurrentItems] = useState([]);
  const [selectedSort, setSelectedSort] = useState([]);

  const fetchItems = async () => {
    try {
      const [masterItems, soldItems] = await searchItems(searchString);
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

  const handleSubcategoryClick = async (subcategory) => {
    setSelectedSubcategory(subcategory);
    if (subcategory) {
      const [masterItems, soldItems] = await getItemsBySubcategory(subcategory);
      setCurrentItems([...masterItems, ...soldItems]);
    } else {
      fetchItems(); 
    }
  };

  useEffect(() => {
      fetchItems();
    }, [searchString]);

    useEffect(() => {
        setCurrentItems(currentItems);
    }, [selectedSort, currentItems]);

    const handleSort = async (sort) => {
      setSelectedSort(sort.value)
      if (selectedSort) {
        sortItemsByOption(selectedSubcategory, selectedSort);
            
      } else {
        fetchItems();
      }
    };
      
    const sortItemsByOption = async (subcategory, sort) => {
      const [masterItems, soldItems] = await getItemsBySubcategory(subcategory);
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
    <div>
    <div className="category-page-container">
      <h1>Search</h1>
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
            reset filter
          </button>
        )}
        {[
          { label: "low to high", value: "lowToHigh" },
          { label: "high to low", value: "highToLow" },
          { label: "most recent", value: "mostRecent" },
          { label: "least recent", value: "leastRecent" },
        ].map((sort) => (
          <button
            key={sort.value}
            className={`filter-tag ${
              selectedSort === sort.value ? "selected" : ""
            }`}
            onClick={() => handleSort(sort)}
            >
            {sort.label}
          </button>
        ))}

        {selectedSort && (
          <button
            className="reset-filter"
            onClick={() => handleSort("")}
          >
            reset sort
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

export default SearchPage;
