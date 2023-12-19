import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getItemById, getAccountByUsername } from "../mongo/Mongo-Functions";
import { BSON } from "mongodb-stitch-browser-sdk";
import "../styles/items.css";

const ItemDetailPage = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    const fetchItemAndSeller = async () => {
      try {
        const fetchedItem = await getItemById(new BSON.ObjectId(itemId));
        if (fetchedItem) {
          setItem(fetchedItem);
          const fetchedSeller = await getAccountByUsername(fetchedItem.seller);
          setSeller(fetchedSeller);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchItemAndSeller();
  }, [itemId]);

  if (!item || !seller) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content animated">
      <section
        style={{ display: "flex", marginBottom: "7rem", marginLeft: "5rem" }}
      >
        {item.photoFilenames.length > 0 && (
          <img
            className="card-image"
            src={item.photoFilenames[0]}
            alt={item.title}
          />
        )}

        <div
          className="about"
          style={{
            maxWidth: "26rem",
            backgroundColor: "#f8f8f8",
            padding: "2rem",
            borderRadius: "10px",
          }}
        >
          <div className="profile-container">
            <img
              className="profile-photo"
              src={seller.photoProfileFilenames}
              alt={seller.fullname}
            />
            <a href={`/seller/${seller.username}`}>{seller.fullname}</a>
          </div>

          <h2 style={{ margin: "0rem" }}>{item.title}</h2>
          <h3 style={{ margin: "0rem" }}>${item.price}</h3>
          <p style={{ marginBottom: "0.8rem" }}>{item.description}</p>
          <hr />

          <div>
            <p>
              <b>Contact</b>
            </p>
            <p>
              💌 &nbsp;
              <a href={`mailto:${seller.contactInformation.email}`}>
                {seller.contactInformation.email}
              </a>
            </p>
            {seller.contactInformation["phone number"] && (
              <p>
                📞 &nbsp;
                <a href={`tel:${seller.contactInformation["phone number"]}`}>
                  {seller.contactInformation["phone number"]}
                </a>
              </p>
            )}
            {seller.contactInformation.instagram && (
              <p>
                IG: &nbsp;
                <a
                  href={`https://www.instagram.com/${seller.contactInformation.instagram}`}
                >
                  @{seller.contactInformation.instagram}
                </a>
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ItemDetailPage;
