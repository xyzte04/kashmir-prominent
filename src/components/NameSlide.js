import React from "react";
import "../styles/NameSlide.scss";

const NameSlide = ({ name, dateStr }) => {
  return (
    <div className="name-slide slide">
      <div className="person-details-big">
        <p className="person-death-date sans greyed bold">{dateStr}</p>
        <p className="person-name sans bold">{name}</p>
      </div>
    </div>
  );
};

export default NameSlide;
