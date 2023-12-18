import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  searchItems} from "../mongo/Mongo-Functions";
import ItemComponent from "./ItemComponent";
import "../styles/category.css";


const SearchPage = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();
    // const [commandString, setCommandString] = useState<string>("");
    const { categoryName } = useParams();
  const [items, setItems] = useState([]);
  const [subcategories, setSubcategories] = useState(new Set());
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const fetchItems = async () => {
    try {
      const [masterItems, soldItems] = await searchItems(commandString);
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

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to the search page with the provided keyword
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
  };


  return (
     <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          name="keyword"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">
          <i className="fa fa-search">Search</i>
        </button>
      </form>
    
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
