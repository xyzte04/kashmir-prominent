import React from "react";
import "../styles/Head.scss";

const Head = ({ toggleLanguage }) => {
  return (
    <div id="head">
      <h1 className="big-serif">Faces of Kashmir</h1>
      <p className="subhed sans light">
        In the past 30 years, terrorists have killed thousands of people.
        <br></br> Here we talk about the 15 of those whose stories still remain
        in the public psyche.
      </p>
    </div>
  );
};

export default Head;
