import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import "./VoiceWave.css";
import MicIcon from "../../../assets/svgs/voice/mic.svg";
import StopIcon from "../../../assets/svgs/voice/stopbutton.svg";

interface WaveSurferComponentProps {
  audioUrl?: string | null;
}

const WaveSurferComponent: React.FC<WaveSurferComponentProps> = ({
  audioUrl,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const wavesurferRef = useRef<WaveSurfer>();
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: containerRef.current,
        height: 1,
        waveColor: "rgb(195, 221, 255)",
        progressColor: "rgb(1, 47, 107)",
        plugins: [Timeline.create(), RegionsPlugin.create()],
      });

      if (audioUrl) {
        wavesurferRef.current.load(audioUrl);

        wavesurferRef.current.on("audioprocess", (time) => {
          if (!wavesurferRef.current || !cursorRef.current) return;
          setCurrentTime(time);

          const cursorPosition =
            (time / wavesurferRef.current.getDuration() || 1) * 100;
          cursorRef.current.style.left = `${cursorPosition}%`;
        });

        wavesurferRef.current.on("play", () => {
          setIsPlaying(true);
        });

        wavesurferRef.current.on("pause", () => {
          setIsPlaying(false);
        });
      }
    }

    return () => {
      wavesurferRef.current?.destroy();
    };
  }, [audioUrl]);

  const onPlayPause = () => wavesurferRef.current?.playPause();

  const formatTime = (seconds: number) =>
    [seconds / 60, seconds % 60]
      .map((v) => `0${Math.floor(v)}`.slice(-2))
      .join(":");

  return (
    <div className="waveform-container h-[4rem] mt-[1rem] m-4 rounded-[1rem] flex justify-center items-center">
      <div className="waveform-container h-[8rem]  w-[18rem] ">
        <div className="flex justify-between p-3">
          {formatTime(currentTime)}

          {audioUrl && (
            <div className="controls flex justify-center items-center w-[3rem] h-[3rem] rounded-[1rem] bg-gray-400">
              <button
                onClick={onPlayPause}
                className="flex justify-center items-center w-full h-full"
              >
                {isPlaying ? (
                  <img
                    src={StopIcon}
                    alt="stop"
                    className="w-[2rem] h-[2rem]"
                  />
                ) : (
                  <img src={MicIcon} alt="play" className="w-[2rem] h-[2rem]" />
                )}
              </button>
            </div>
          )}
        </div>

        <div className="flex  mt-[1rem]">
          <div ref={containerRef} className=" w-[18rem]" />
          <div ref={cursorRef} className="cursor">
            🏄
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaveSurferComponent;
