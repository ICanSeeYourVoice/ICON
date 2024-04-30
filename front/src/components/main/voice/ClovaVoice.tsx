import { useState } from "react";
import MoveButton from "../../common/button/MoveButton";
import mic from "../../../assets/svgs/voice/mic.svg";
import WaveSurferComponent from "./Wave";
import Music from "./icon.mp3";
import "./VoiceWave.css";

const ClovaVoice = () => {
  const [text, setText] = useState("");
  const [tempText, setTempText] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleSubmit = () => {
    setText(tempText);
    setAudioUrl(Music);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTempText(event.target.value);

  return (
    <div className="flex flex-col items-center justify-center">
      {!text && (
        <div className="border-2 border-blue-300 rounded-lg p-4 bg-blue-100 m-4">
          <p className="text-lg text-blue-800 animate-pulse">아기에게 말하기</p>
        </div>
      )}

      {text && <WaveSurferComponent audioUrl={audioUrl} />}

      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white shadow-xl">
        <div className="flex flex-col items-center justify-center text-gray-0 text-xl mb-20">
          <p>{text}</p>
        </div>

        <div className="flex items-center justify-center mb-20">
          <MoveButton text="메인으로 돌아가기" path="/detection" />
        </div>

        <div className="flex justify-center">
          <input
            type="text"
            className="flex-1 p-2"
            placeholder="아기에게 말해보세요"
            value={tempText}
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
