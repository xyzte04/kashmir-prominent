import React from "react";
import "../styles/EndCircularMap.scss";
import Circular from "./Circular";
import Map from "./Map";
import * as d3 from "d3";

const EndCircularMap = ({ persons }) => {
  var rad = window.innerWidth <= 500 ? 100 : 225;
  function handleClick(event) {
    var path = event.srcElement;
    var district = path.__data__.properties.dist_name;
    var currentClickedDistrict = d3.select(".map-click-highlight").node();

    if (
      currentClickedDistrict &&
      district === currentClickedDistrict.__data__.properties.dist_name
    ) {
      d3.selectAll(`.map-district`).classed("map-click-highlight", false);

      d3.select("#end-circular-map")
        .selectAll(`.map-photo`)
        .classed("size-1", false);

      d3.select("#end-circular-map .map-click-label").style("opacity", 0);

      return;
    }

    d3.selectAll(`.map-district`).classed("map-click-highlight", false);

    d3.select(path).classed("map-click-highlight", true);

    d3.select("#end-circular-map")
      .selectAll(`.map-photo`)
      .classed("size-1", false);

    d3.select("#end-circular-map")
      .selectAll(`div[data-killed-district='${district}'`)
      .classed("size-1", true);
  }

  return (
    <div id="end-circular-map">
      <div id="map-circle">
        <Circular
          elements={persons}
          classTemplate="map-photo"
          sizeVariable={false}
          keyProp="name"
          rad={rad}
        ></Circular>
      </div>
      <Map type="full" mapWidth={300} handleClick={handleClick}></Map>
    </div>
  );
};

export default EndCircularMap;
