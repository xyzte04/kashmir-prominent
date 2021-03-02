import React from "react";
import "../styles/DetailSlide.scss";
import VoiceOver from "./VoiceOver.js";

const DetailSlide = ({
  name,
  content,
  englishAudioFile,
  urduAudioFile,
  index,
  wavesurferInit,
  selectedLanguage,
  englishAudioFileLoaded,
  urduAudioFileLoaded,
  thisPersonIsActive,
}) => {
  var paras = content.split("\n").filter((p) => p !== "");

  return (
    <div className="detail-slide slide sans">
      <VoiceOver
        name={name}
        audioFile={
          selectedLanguage === "english" ? englishAudioFile : urduAudioFile
        }
        loaded={
          selectedLanguage === "english"
            ? englishAudioFileLoaded
            : urduAudioFileLoaded
        }
        index={index}
        wavesurferInit={wavesurferInit}
        thisPersonIsActive={thisPersonIsActive}
      ></VoiceOver>
      {paras.map((p, i) => {
        return (
          <p className="person-content" key={i}>
            {p}
          </p>
        );
      })}
    </div>
  );
};

export default DetailSlide;
