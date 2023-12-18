import React from "react";
import "../styles/images.css";

const ItemComponent = ({ item }) => {
  const mainImageSrc =
    item.photoFilenames.length > 0 ? item.photoFilenames[0] : null;
    return (
      <div className="animated">
        <div className="item">
        {mainImageSrc && (
          <img className="item-image" src={mainImageSrc} alt={item.title} />
        )}
        <p>{item.title} <br />
        ${item.price} <br />
        Seller: {item.seller}</p>
        </div>
      </div>
    );
  };

export default ItemComponent;
