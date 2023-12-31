import React from "react";
import Slideshow from "./Slideshow";
import crab from "../images/events/crab-eboard.jpg";
import magnet from "../images/events/magnet-workshop.jpg";
import model from "../images/events/model-call.jpg";

function HomePage() {
  return (
    <div>
      <div>
        <Slideshow />
      </div>

      <section className="team">
        <h2>Upcoming Events</h2>
        <div className="team-members">
          <div className="team-member">
            <img src={crab} alt="Create @ Brown E-board Application" />
          </div>
          <div className="team-member">
            <img src={magnet} alt="M" />
          </div>
          <div className="team-member">
            <img src={model} alt="Fashion @ Brown Model Call" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
