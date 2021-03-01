import React from "react";
import "../styles/Toggle.scss";

const Toggle = ({ options, toggleFunc, selectedLanguage }) => {
  return (
    <div id="toggle-language" className="sans">
      <p className="toggle-language-desc">Change Audio Language</p>
      <div
        className={
          "toggle-option" +
          (selectedLanguage === "english" ? " active-toggle" : "")
        }
        data-value="english"
        onClick={toggleFunc}
      >
        English
      </div>
      <div
        className={
          "toggle-option" +
          (selectedLanguage === "urdu" ? " active-toggle" : "")
        }
        data-value="urdu"
        onClick={toggleFunc}
      >
        Urdu
      </div>
    </div>
  );
};

export default Toggle;
