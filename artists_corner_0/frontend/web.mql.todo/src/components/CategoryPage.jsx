import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getItemsByCategory,
  getItemsBySubcategory,
  sortPriceLowToHigh,
  sortByPriceHighToLow,
  sortMostToLeastRecent,
  sortLeastToMostRecent,
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
      //////////

      const [masterItems, soldItems] = await getItemsByCategory(categoryName);
      console.log("Master Items:");
      masterItems.map(item => {
        // console.log(item);
        // Access and read values of each item object
        console.log("master Title:", item.title);
      });


      console.log("Sold Items:");
      soldItems.map(item => {
        // console.log(item);
        // Access and read values of each item object
        console.log("sold Title:", item.title);
      });

      //////////

      const masterItemsStrings = masterItems.map(item => JSON.stringify(item.title));

      // Log the string representation of each master item
      console.log("Master Items Strings:");
      masterItemsStrings.forEach(itemString => console.log(itemString));

      const combinedItems = [...masterItems, ...soldItems];
      console.log("tuple length: " + [masterItems, soldItems].length)
      console.log("tuple... length: " + [...masterItems, ...soldItems].length)
      console.log("combined items length: " + combinedItems.length)

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
    if (selectedSort) {
      console.log("selected filter:" + selectedSort)
      console.log("current items:" + currentItems)

      // const sortedItems = sortItemsByOption(selectedFilter, currentItems);
      // setCurrentItems(sortedItems);
    } else {
      setCurrentItems(currentItems);
    }
  }, [selectedSort, currentItems]);

  const handleSubcategoryClick = async (subcategory) => {
    setSelectedSubcategory(subcategory);
    if (subcategory) {
      const [masterItems, soldItems] = await getItemsBySubcategory(subcategory);
      setCurrentItems([...masterItems, ...soldItems]);
    } else {
      fetchItems(); // Reset to all items in the category
    }
  };

const handleSort = async (sort) => {
  console.log("filter value: " + sort.value)
  setSelectedSort(sort.value)
  if (selectedSort) {
    sortItemsByOption(selectedSort);
        
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
  );
};

export default CategoryPage;
