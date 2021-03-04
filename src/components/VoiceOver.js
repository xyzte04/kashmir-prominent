import React, { useEffect, useRef, useState } from "react";
import "../styles/VoiceOver.scss";
import WaveSurfer from "wavesurfer.js";

const VoiceOver = ({
  name,
  audioFile,
  index,
  wavesurferInit,
  thisPersonIsActive,
}) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // var [thisId, setId] = useState(null);
  var [subscribed, setSubscribed] = useState(false);
  var thisId = "waveform-" + index;

  // effect for initial setup
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
      console.log(name, "Destroy");
      window.activeAudio = null;
      wavesurferRef.current.destroy();
      setLoaded(false);
    };
  }, [audioFile]);

  // effect for loading file when user scrolls to it.
  useEffect(() => {
    if (wavesurferRef && wavesurferRef.current) {
      if (window.activePerson === name && !loaded) {
        wavesurferRef.current.load(audioFile);

        wavesurferRef.current.on("ready", function () {
          setLoaded(true);
          // make sure object stillavailable when file loaded
          // wavesurferRef.current.play();
        });
      }
    }
    // return () => {
    //   if (wavesurferRef && wavesurferRef.current) wavesurferRef.current.pause();
    // };
  }, [audioFile, thisPersonIsActive, loaded]);

  useEffect(() => {
    if (wavesurferRef && wavesurferRef.current) {
      if (window.activePerson === name && loaded) {
        window.activeAudio = wavesurferRef.current;
        wavesurferRef.current.play();
      } else if (window.activePerson !== name && loaded) {
        wavesurferRef.current.pause();
      }
    }
  }, [thisPersonIsActive, loaded]);

  return (
    <div className="voice-over container">
      <div id={thisId} ref={waveformRef}></div>
    </div>
  );
};

export default VoiceOver;
