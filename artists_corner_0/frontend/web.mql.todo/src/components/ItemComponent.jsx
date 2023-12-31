import React from "react";
import "../styles/items.css";
import { Link } from "react-router-dom";

const ItemComponent = ({ item }) => {
  const mainImageSrc =
    item.photoFilenames.length > 0 ? item.photoFilenames[0] : null;

  return (
    <div className="item-card">
      <Link to={`/item/${item._id}`}>
        {mainImageSrc && <img src={mainImageSrc} alt={item.title} />}
        <p>
          <b>{item.title}</b>
        </p>
        <p>${item.price}</p>
      </Link>
      <p>
        by <Link to={`/user/${item.seller}`}>{item.seller}</Link>
      </p>
    </div>
  );
};

export default ItemComponent;
