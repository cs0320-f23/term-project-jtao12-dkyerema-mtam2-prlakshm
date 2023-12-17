// import React, { useEffect } from "react";
// import Slideshow from "./Slideshow";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import "../styles/home.css";

// export default function App() {
//   useEffect(() => {
//     const handleScroll = () => {
//       let lastScrollTop = 0;
//       const mainContent = document.querySelector(".main-content");
//       const footer = document.querySelector(".footer");

//       window.addEventListener("scroll", function () {
//         let st = window.pageYOffset || document.documentElement.scrollTop;
//         if (st > lastScrollTop) {
//           mainContent.style.marginBottom = "0";
//         } else {
//           mainContent.style.marginBottom = `${footer.offsetHeight}px`;
//         }
//         lastScrollTop = st <= 0 ? 0 : st;
//       });
//     };

//     handleScroll();

//     // Cleanup function
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <Router>
//       <div>
//         <div className="header">
//           <Link to="/" style={{ color: "#303030" }}>
//             Artist's Corner PVD
//           </Link>
//           <div className="search-container">
//             <form action="/action_page.php">
//               <input type="text" placeholder="Search..." name="search" />
//               <button type="submit">
//                 <i className="fa fa-search"></i>
//               </button>
//             </form>
//           </div>
//         </div>

//         <div className="topnav">
//           <div className="right-links">
//             <Link to="/category/accessories">Accessories</Link>
//             <Link to="/category/apparel">Apparel</Link>
//             <Link to="/category/artwork">Artwork</Link>
//             <Link to="/category/crafts">Crafts</Link>
//             <Link to="/category/misc">Misc.</Link>
//             <a href="events.html">Events</a>
//             <a href="about.html">About</a>
//           </div>
//         </div>

//         <div className="main-content">
//           <Slideshow />
//           <div className="slideshow-container"></div>

//           <section className="upcoming-events-container">
//             <div className="upcoming-events">
//               <div className="container">
//                 <div className="heading_container">
//                   <h2>Upcoming Events</h2>
//                   <div className="images">
//                     {/* Event images and descriptions */}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>

//         <Routes></Routes>

//         <div className="footer">
//           <p style={{ fontSize: "0.9rem" }}>
//             Copyright © 2023 Artist's Corner PVD.&nbsp; Made with ❤️ in
//             Providence.
//           </p>
//         </div>
//       </div>
//     </Router>
//   );
// }

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import "../styles/home.css";

function App() {
  return (
    <Router>
      <div className="header">
        <Link to="/" style={{ color: "#303030" }}>
          Artist's Corner PVD
        </Link>
        <div className="search-container">
          <form action="/action_page.php">
            <input type="text" placeholder="Search..." name="search" />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
      </div>
      <div className="topnav">
        <div className="right-links">
          <Link to="/category/accessories">Accessories</Link>
          <Link to="/category/apparel">Apparel</Link>
          <Link to="/category/artwork">Artwork</Link>
          <Link to="/category/crafts">Crafts</Link>
          <Link to="/category/misc">Misc.</Link>
          <Link to="/events">Events</Link>
          <Link to="/about">About</Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <div className="footer">
        <p style={{ fontSize: "0.9rem" }}>
          Copyright © 2023 Artist's Corner PVD.&nbsp; Made with ❤️ in
          Providence.
        </p>
      </div>
    </Router>
  );
}

export default App;
