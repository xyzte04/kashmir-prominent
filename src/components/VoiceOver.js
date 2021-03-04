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
    console.log(name, "bleh1");
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
    console.log(name, "bleh2");
    if (wavesurferRef && wavesurferRef.current) {
      if (thisPersonIsActive && !loaded) {
        console.log(name, "bleh23");
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
    console.log(name, "bleh3");
    if (wavesurferRef && wavesurferRef.current) {
      if (thisPersonIsActive && loaded) {
        window.activeAudio = wavesurferRef.current;
        wavesurferRef.current.play();
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
