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
  englishAudioFileLoaded,
  urduAudioFileLoaded,
  thisPersonIsActive,
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
        name={name}
        content={content}
        englishAudioFile={englishAudioFile}
        urduAudioFile={urduAudioFile}
        index={index}
        wavesurferInit={wavesurferInit}
        selectedLanguage={selectedLanguage}
        englishAudioFileLoaded={englishAudioFileLoaded}
        urduAudioFileLoaded={urduAudioFileLoaded}
        thisPersonIsActive={thisPersonIsActive}
      ></DetailSlide>
    </div>
  );
};

export default Person;
