import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getItemById } from "../mongo/Mongo-Functions"; // Adjust the path as needed

const ItemDetailPage = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    getItemById(itemId)
      .then((itemData) => setItem(itemData))
      .catch((error) => console.error(error));
  }, [itemId]);

  return <div></div>;
};

export default ItemDetailPage;
