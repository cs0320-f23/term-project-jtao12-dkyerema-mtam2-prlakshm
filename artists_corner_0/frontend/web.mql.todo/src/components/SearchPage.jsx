import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  searchItems} from "../mongo/Mongo-Functions";
import ItemComponent from "./ItemComponent";
import "../styles/category.css";


const SearchPage = ({ searchString, searchClicked }) => {
  const { categoryName } = useParams();
  const [items, setItems] = useState([]);
  const [subcategories, setSubcategories] = useState(new Set());
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  // const [searchString, setSearchString] = useState('');
  // const [searchClicked, setSearchClicked] = useState(false);

  console.log("2:" + searchString);

  const fetchItems = async () => {
    try {
      const [masterItems, soldItems] = await searchItems(searchString);
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

  const handleSearchClick = () => {
    setSearchClicked(true);
  };

  const handleSubcategoryClick = async (subcategory) => {
    setSelectedSubcategory(subcategory);
    if (subcategory) {
      const [masterItems, soldItems] = await getItemsBySubcategory(subcategory);
      setItems([...masterItems, ...soldItems]);
    } else {
      fetchItems(); // Reset to all items in the category
    }
  };

  useEffect(() => {
    // if (searchClicked) {
      // console.log("puppies")
      fetchItems();
      // setSearchClicked(false);
      // setSearchString("")
    // }
  }, [searchString]);

  console.log("search clicked? " + searchClicked)

  return (
    <div>
      {/* <input
        type="text"
        placeholder="Search..."
        value={searchString}
        setValue={setSearchString}
        onChange={handleInputChange}
      />
      <button onClick={handleSearchClick}>Search</button> */}
    
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
      </div>
      <div className="items-grid">
        {items.map((item) => (
          <ItemComponent key={item._id} item={item} />
        ))}
      </div>
    </div>
    </div>

  );
};

export default SearchPage;