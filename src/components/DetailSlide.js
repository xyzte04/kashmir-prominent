import React from "react";
import "../styles/DetailSlide.scss";
import VoiceOver from "./VoiceOver.js";

const DetailSlide = ({
  content,
  englishAudioFile,
  urduAudioFile,
  index,
  wavesurferInit,
  selectedLanguage,
}) => {
  var paras = content.split("\n").filter((p) => p !== "");

  return (
    <div className="detail-slide slide sans">
      <VoiceOver
        audioFile={
          selectedLanguage === "english" ? englishAudioFile : urduAudioFile
        }
        index={index}
        wavesurferInit={wavesurferInit}
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
