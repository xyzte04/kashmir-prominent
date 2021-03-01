import React, { useEffect, useRef } from "react";
import "../styles/BackgroundAudio.scss";
import WaveSurfer from "wavesurfer.js";

const BackgroundAudio = ({ audioFile }) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);

  useEffect(() => {
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#3a3a3a",
      progressColor: "#737171",
      height: 50,
      maxCanvasWidth: 300,
    });

    wavesurferRef.current.load(audioFile);

    wavesurferRef.current.on("ready", function () {
      // make sure object stillavailable when file loaded
      wavesurferRef.current.play();
      if (wavesurferRef.current) {
        // wavesurferRef.current.setVolume(volume);
        // setVolume(volume);
      }
    });

    wavesurferRef.current.on("finish", function () {
      wavesurferRef.current.stop();
      wavesurferRef.current.play();
    });

    return () => wavesurferRef.current.destroy();
  }, [audioFile]);

  return (
    <div className="background-audio">
      <div id={"waveform-background"} ref={waveformRef}></div>
    </div>
  );
};

export default BackgroundAudio;
