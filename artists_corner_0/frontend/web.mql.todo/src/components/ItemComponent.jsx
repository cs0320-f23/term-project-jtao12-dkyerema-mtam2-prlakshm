import React from "react";

const ItemComponent = ({ item }) => {
  const mainImageSrc =
    item.photoFilenames.length > 0 ? item.photoFilenames[0] : null;
  return (
    <div className="item">
      {mainImageSrc && <img src={mainImageSrc} alt={item.title} />}
      <h3>{item.title}</h3>
      <p>${item.price}</p>
      <p>Seller: {item.seller}</p>
    </div>
  );
};

export default ItemComponent;
