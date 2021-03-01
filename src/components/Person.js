import React, { useState, useRef } from "react";
import "../styles/Person.scss";
import NameSlide from "./NameSlide";
import DetailSlide from "./DetailSlide";

const Person = ({
  name,
  dateStr,
  image,
  content,
  englishAudioFile,
  urduAudioFile,
  index,
  handlePlay,
  selectedLanguage,
}) => {
  // var [thisWavesurfer, setThisWaveSurfer] = useState(null);
  const thisPerson = useRef(null);

  function wavesurferInit(instance) {
    thisPerson.current.wavesurferInstance = instance;
    // setThisWaveSurfer(instance);
  }

  return (
    <div className="person-container sans" ref={thisPerson}>
      <NameSlide name={name} dateStr={dateStr}></NameSlide>
      <DetailSlide
        content={content}
        englishAudioFile={englishAudioFile}
        urduAudioFile={urduAudioFile}
        index={index}
        wavesurferInit={wavesurferInit}
        selectedLanguage={selectedLanguage}
      ></DetailSlide>
    </div>
  );
};

export default Person;
