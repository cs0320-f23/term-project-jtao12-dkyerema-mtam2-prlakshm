import React, { useState, useEffect } from "react";

import "../styles/slideshow.css";
import image1 from "../images/slideshow/sayles_dance.jpeg";
import image2 from "../images/slideshow/list_painting.jpeg";
import image3 from "../images/slideshow/pottery.jpeg";

const slidesData = [
  {
    image: image1,
    caption: "20 Dec: Dance Performance at Sayles",
  },
  {
    image: image2,
    caption: "21 Dec: Painting Exhibition at List",
  },
  {
    image: image3,
    caption: "22 Dec: Pottery Workshop",
  },
];

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slidesData.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000); // Change slide every 5 seconds

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="slideshow-container">
      {slidesData.map((slide, index) => (
        <div
          key={index}
          className="mySlides fade"
          style={{
            display: index === currentSlide ? "block" : "none",
          }}
        >
          <img src={slide.image} style={{ width: "100%" }} />
          <div className="text">{slide.caption}</div>
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
