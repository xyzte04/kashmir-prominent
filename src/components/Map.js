import React, { useEffect, useRef } from "react";
import "../styles/Map.scss";
import jnk from "../data/jnk.json";
import jnkBoundaries from "../data/jnk-boundaries.json";
import * as d3 from "d3";

var centroids = {};

jnk.features.forEach((f) => {
  f.properties.dist_name = clean(
    f.properties.DISTRICT.toLowerCase() === "shopiyan"
      ? "shupiyan"
      : f.properties.DISTRICT.toLowerCase() === "bandipura"
      ? "bandipore"
      : f.properties.DISTRICT.toLowerCase() === "badgam"
      ? "budgam"
      : f.properties.DISTRICT.toLowerCase() === "baramula"
      ? "baramulla"
      : f.properties.DISTRICT.toLowerCase()
  );
  centroids[f.properties.dist_name] = d3.geoCentroid(f);
});

function clean(s) {
  return s.trim().replace(/[()]/gi, "").replace(/ /gi, "-").toLowerCase();
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const Map = ({
  type,
  district,
  mapWidth = 500,
  mapHeight = 300,
  handleClick = null,
  handleHover = null,
}) => {
  const mapContainer = useRef(null);

  const divStyle = {
    width: "100%",
    height: "100%",
    textAlign: "center",
  };

  var w = mapWidth;
  var h = mapHeight;
  var mapData;

  if (type === "district") {
    mapData = {
      type: "FeatureCollection",
      name: "jnk",
      crs: {
        type: "name",
        properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
      },
      features: jnk.features.filter((f) => f.properties.dist_name === district),
    };
  } else {
    mapData = jnk;
  }

  useEffect(() => {
    var svgNode = d3.select(mapContainer.current).select("svg").node();
    if (svgNode !== null && svgNode.dataset.district === district) return;

    if (type === "district") {
      mapData = {
        type: "FeatureCollection",
        name: district,
        crs: {
          type: "name",
          properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
        },
        features: jnk.features.filter((f) => {
          return f.properties.dist_name === district;
        }),
      };
    }

    var projection = d3
      .geoMercator()
      .scale(1300)
      .translate([75.3412, 33.2778])
      .fitSize([w, h], mapData);

    var geoPath = d3.geoPath(projection);

    var svg, mapLabel, mapClickLabel;

    if (svgNode === null) {
      svg = d3
        .select(mapContainer.current)
        .append("svg")
        .attr("class", "map-container")
        .attr("data-district", type === "district" ? district : null)
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("class", "map-container-g");
    } else {
      svg = d3.select(mapContainer.current).select(".map-container-g");
    }

    svg
      .selectAll("path")
      .data(mapData.features, (f) => f.properties.dist_name)
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", (d) => {
              return d.properties.dist_name;
            })
            .classed("map-district", true)
            .attr("d", geoPath)
            .on("click", (ev) => {
              var dist = ev.srcElement.__data__.properties.dist_name;
              var xy = projection(centroids[clean(dist)]);
              xy[0] = xy[0] - 35;
              xy[1] = xy[1] - 15;

              var nm = mapData.features.filter(
                (f) => f.properties.dist_name === dist
              )[0].properties.DISTRICT;

              if (nm === "Leh (Ladakh)") nm = "Leh";

              mapClickLabel
                .attr("transform", `translate(${xy[0]}, ${xy[1]})`)
                .style("opacity", 1)
                .selectAll("text")
                .text(nm);

              if (handleClick) handleClick(ev);
            })
            .on("mouseover", (d) => {
              var dist = d.srcElement.__data__.properties.dist_name;
              var xy = projection(centroids[clean(dist)]);
              xy[0] = xy[0] - 35;
              xy[1] = xy[1] - 15;

              var nm = mapData.features.filter(
                (f) => f.properties.dist_name === dist
              )[0].properties.DISTRICT;

              if (nm === "Leh (Ladakh)") nm = "Leh";

              mapLabel
                .attr("transform", `translate(${xy[0]}, ${xy[1]})`)
                .style("opacity", 1)
                .selectAll("text")
                .text(nm);
            })
            .on("mouseout", () => {
              mapLabel.style("opacity", 0);
            }),
        (update) => update,
        (exit) => exit.remove()
      )
      .classed("map-highlight", (d) => d.properties.dist_name === district);

    if (type === "full") {
      svg
        .selectAll("path.map-district-boundaries")
        .data(jnkBoundaries.features)
        .enter()
        .append("path")
        .classed("map-district-boundaries", true)
        .attr("d", geoPath);

      svg.selectAll(".map-hover-label").remove();
      svg.selectAll(".map-click-label").remove();

      mapLabel = svg.append("g").attr("class", "map-hover-label");

      mapLabel.append("text").attr("class", "map-hover-label-stroke sans");
      mapLabel.append("text").attr("class", "map-hover-label-text sans");

      mapClickLabel = svg.append("g").attr("class", "map-click-label");

      mapClickLabel.append("text").attr("class", "map-click-label-stroke sans");
      mapClickLabel.append("text").attr("class", "map-click-label-text sans");

      if (district) {
        var xy = projection(centroids[clean(district)]);
        xy[0] = xy[0] - 35;
        xy[1] = xy[1] - 15;

        var nm = mapData.features.filter(
          (f) => f.properties.dist_name === district
        )[0].properties.DISTRICT;

        if (nm === "Leh (Ladakh)") nm = "Leh";

        mapLabel
          .attr("transform", `translate(${xy[0]}, ${xy[1]})`)
          .style("opacity", 1)
          .selectAll("text")
          .text(nm);

        // mapHoverLabel.raise();

        // d3.select(this).classed("map-hover-highlight", true);

        // d3.select(".jnk-label")
        //   .transition()
        //   .duration(200)
        //   .style("opacity", 0);
      }

      // var jnkLabel = svg
      //   .append("g")
      //   .attr("class", "jnk-label")
      //   .classed("dark-greyed", true);

      // jnkLabel
      //   .append("text")
      //   .attr("y", h / 2 + 100)
      //   .attr("x", w / 2 - 90)
      //   .text("Jammu");

      // jnkLabel
      //   .append("text")
      //   .attr("y", h / 2 + 20)
      //   .attr("x", w / 2 + 30)
      //   .text("Leh");

      // jnkLabel
      //   .append("text")
      //   .attr("x", w / 2 - 100)
      //   .attr("y", h / 2 - 30)
      //   .text("Kashmir");
    }
  });

  return <div ref={mapContainer} style={divStyle} className="map-outer"></div>;
};

export default Map;
