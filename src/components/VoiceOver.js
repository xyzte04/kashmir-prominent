import React, { useEffect, useRef, useState } from "react";
import "../styles/VoiceOver.scss";
import WaveSurfer from "wavesurfer.js";

const VoiceOver = ({
  name,
  audioFile,
  index,
  wavesurferInit,
  loaded,
  thisPersonIsActive,
}) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);

  // var [thisId, setId] = useState(null);
  var [subscribed, setSubscribed] = useState(false);
  var thisId = "waveform-" + index;

  useEffect(() => {
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      progressColor: "#dc6d6d",
      waveColor: "#737171",
      height: 60,
      cursorWidth: 1.5,
      cursorColor: "#fff",
      partialRender: true,
    });

    wavesurferInit(wavesurferRef.current);

    return () => {
      console.log("Destroy");
      window.activeAudio = null;
      wavesurferRef.current.destroy();
    };
  }, [audioFile]);

  useEffect(() => {
    if (wavesurferRef && wavesurferRef.current) {
      if (thisPersonIsActive) {
        wavesurferRef.current.load(audioFile);

        wavesurferRef.current.on("ready", function () {
          // make sure object stillavailable when file loaded
          if (window.activePerson === name) {
            window.activeAudio = wavesurferRef.current;
            wavesurferRef.current.play();
          }
          // wavesurferRef.current.play();
        });
      }
    }
    // return () => {
    //   if (wavesurferRef && wavesurferRef.current) wavesurferRef.current.pause();
    // };
  }, [audioFile, thisPersonIsActive]);

  return (
    <div className="voice-over container">
      <div id={thisId} ref={waveformRef}></div>
    </div>
  );
};

export default VoiceOver;
