import React from "react";
import "../styles/about.css";
import pranaviImage from "../images/about-us/pranavi.jpg";
import dorindaImage from "../images/about-us/dorinda.jpg";
import jeffreyImage from "../images/about-us/jeffrey.jpg";
import marissaImage from "../images/about-us/marissa.jpg";

function AboutPage() {
  return (
    <div>
      <main className="about-page-container">
        <section className="about-us">
          <h1>Why we're here</h1>
          <p>
            Artist's Corner PVD is more than just a marketplace; it's a vibrant,
            year-round hub for Brown and RISD's creative talent. Born from the
            desire to extend the spirit of campus art fairs and maker markets,
            we offer a platform where student creators and art enthusiasts
            connect beyond the constraints of physical events.
          </p>
          <p>
            Custom-built for our university communities, Artists' Corner is a
            place where student artists and art lovers can explore and engage in
            a streamlined, safe environment. With our exclusive focus on Brown
            and RISD we hope to ensure a unique, intimate experience and foster
            a strong sense of community.
          </p>
        </section>
        <section className="team">
          <h2>Meet Our Team</h2>
          <div className="team-members">
            <div className="team-member">
              <img src={pranaviImage} alt="Pranavi Lakshminarayanan" />
              <p>Pranavi Lakshminarayanan</p>
            </div>
            <div className="team-member">
              <img src={dorindaImage} alt="Dorinda Kyeremateng" />
              <p>Dorinda Kyeremateng</p>
            </div>
            <div className="team-member">
              <img src={jeffreyImage} alt="Jeffrey Tao" />
              <p>Jeffrey Tao</p>
            </div>
            <div className="team-member">
              <img src={marissaImage} alt="Marissa Tam" />
              <p>Marissa Tam</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AboutPage;
