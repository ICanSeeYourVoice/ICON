import { useMutation } from "@tanstack/react-query";
import { clovaVoice } from "../../../apis/Voice";
import { useState, useRef } from "react";
import mic from "../../../assets/svgs/voice/mic.svg";

const ClovaVoice = () => {
  const [text, setText] = useState("");

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
      <div className="bg-blue-800 rounded-full p-2 inline-block w-16 h-16 flex items-center justify-center">
        <img src={mic} alt="mic" className="w-full h-full object-cover" />
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white shadow-xl">
        <audio ref={audioRef} controls />
        <div className="flex justify-center">
          <input
            type="text"
            className="flex-1 p-2"
            placeholder="아기에게 말해보세요"
            value={text}
            onChange={handleTextChange}
          />
          <button
            onClick={handleSubmit}
            className={`ml-2 w-[2rem] h-[2rem] flex items-center justify-center rounded-full p-2 ${
              text ? "bg-blue-500" : "bg-blue-300"
            }`}
          >
            <img src={mic} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClovaVoice;
