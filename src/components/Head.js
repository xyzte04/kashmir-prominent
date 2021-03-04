import React, { useState } from "react";
import "../styles/Head.scss";

const Head = ({ toggleLanguage }) => {
  var isMobile = window.innerWidth <= 500;
  var [audioOn, setAudioOn] = useState(false);

  return (
    <div id="head">
      <h1 className="big-serif">Faces of Kashmir</h1>
      <p className="subhed sans light">
        In the past 30 years, terrorists have killed thousands of Kashmiris.
        <br></br> Here we talk about the 15 of those whose stories still remain
        in the public psyche.
      </p>
      <div
        id="unmute-phone"
        onClick={() => {
          setAudioOn(!audioOn);
        }}
      >
        <img
          src={"images/" + (audioOn ? "sound-on.svg" : "sound-off.svg")}
          alt={audioOn ? "audio-on" : "audio-off"}
        ></img>
        {audioOn ? "Press to mute" : "Page has audio. Press to unmute."}
      </div>
    </div>
  );
};

export default Head;
