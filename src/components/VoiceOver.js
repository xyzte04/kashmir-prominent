import React, { useEffect, useRef, useState } from "react";
import "../styles/VoiceOver.scss";
import WaveSurfer from "wavesurfer.js";

const VoiceOver = ({ audioFile, index, wavesurferInit }) => {
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
    });

    wavesurferInit(wavesurferRef.current);

    wavesurferRef.current.load(audioFile);

    wavesurferRef.current.on("ready", function () {
      // make sure object stillavailable when file loaded
      if (
        window.activeAudio &&
        window.activeAudio.mediaContainer.id === thisId
      ) {
        window.activeAudio = wavesurferRef.current;
        wavesurferRef.current.play();
      }
    });

    return () => wavesurferRef.current.destroy();
  }, [audioFile]);

  return (
    <div className="voice-over container">
      <div id={thisId} ref={waveformRef}></div>
    </div>
  );
};

export default VoiceOver;
