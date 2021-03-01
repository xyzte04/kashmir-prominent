import React from "react";
import "../styles/NameSlide.scss";

const NameSlide = ({
  elements,
  classTemplate,
  sizeVariable = true,
  keyProp,
  dataProp,
  dataPropName,
  rad,
}) => {
  var angleArc = (2 * Math.PI) / elements.length;
  var photoW = 30;
  var photoH = 60;
  return elements.map((nm, i) => {
    var cNm = "";
    if (sizeVariable) {
      if (i === elements.length - 2) cNm = "size-1";
      else if (i === elements.length - 1 || i === elements.length - 3)
        cNm = "size-2";
      else if (i === 0 || i === elements.length - 4) cNm = "size-3";
      else cNm = "size-4";
    }

    var theta = angleArc * i;
    var left = rad + rad * Math.sin(theta) - photoW / 2;
    var top = rad - rad * Math.cos(theta) - photoH / 2;
    var divStyle = {
      top: top + "px",
      left: left + "px",
    };

    return (
      <div
        className={classTemplate + " " + cNm}
        style={divStyle}
        key={nm[keyProp]}
        data-person={nm["name"]}
        data-killed-district={nm["district"]}
      >
        <img src={"images/" + nm["image"]} alt={"alt"}></img>
        {/* <div className="person-name">{nm[dataProp]}</div> */}
      </div>
    );
  });
};

export default NameSlide;
