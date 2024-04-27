import { useMutation } from "@tanstack/react-query";
import { clovaVoice } from "../../../apis/Voice";
import { useState, useRef } from "react";

const ClovaVoice = () => {
  const { mutate } = useMutation({
    mutationFn: clovaVoice,
    onSuccess: (data) => {
      console.log("voice 성공");
      if (audioRef.current) {
        audioRef.current.src = URL.createObjectURL(data);
      }
    },
    onError: (error) => {
      console.log("voice 실패", error);
    },
  });

  const [text, setText] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = () => {
    const voiceParams = {
      text: text,
      speaker: "nara",
      volume: 0,
      speed: 0,
      pitch: 0,
      format: "mp3",
    };
    mutate(voiceParams);
  };

  return (
    <div>
      <h1>TTS</h1>
      <input type="text" value={text} onChange={handleTextChange} />
      <button onClick={handleSubmit}>Generate Voice</button>
      <audio ref={audioRef} controls />
    </div>
  );
};

export default ClovaVoice;
