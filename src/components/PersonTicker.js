import React from "react";
import "../styles/PersonTicker.scss";
import Circular from "./Circular";
import Map from "./Map";

// var activeAngle = ;

const PersonTicker = ({ persons, activeDistrict }) => {
  var rad = window.innerWidth <= 500 ? 100 : 225;
  return (
    <div id="person-ticker">
      <div id="ticker-photo-container">
        <Circular
          elements={persons}
          classTemplate="ticker-photo"
          sizeVariable={true}
          keyProp="name"
          rad={rad}
        ></Circular>
        <Map type="full" district={activeDistrict} mapWidth={300}></Map>
      </div>
    </div>
  );
};

export default PersonTicker;
