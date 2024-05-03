import { useState } from "react";
import MoveButton from "../../common/button/MoveButton";
import mic from "../../../assets/svgs/voice/mic.svg";
import WaveSurferComponent from "./Wave";
import "./VoiceWave.css";
import { useMutation } from "@tanstack/react-query";
import { clovaVoice } from "../../../apis/Voice";
import toast from "react-hot-toast";

const ClovaVoice = () => {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const { mutate: fetchVoice } = useMutation({
    mutationFn: clovaVoice,
    onSuccess: (data) => {
      if (data instanceof Blob) {
        const audioBlobUrl = URL.createObjectURL(data);
        setAudioUrl(audioBlobUrl);
      } else {
        console.error("데이터 타입 :", data);
      }
    },
    onError: (error: unknown) => {
      console.error("API 에러:", error);
    },
  });

  const handleSubmit = () => {
    if (!text.trim()) {
      toast.error("텍스트를 입력해주세요");
      return;
    }

    const voiceData = { text: text, speaker: "nara" };
    fetchVoice(voiceData);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setText(event.target.value);

  return (
    <div className="flex flex-col items-center justify-center">
      {!audioUrl && <WaveSurferComponent />}
      {audioUrl && <WaveSurferComponent audioUrl={audioUrl} />}
      <div className="fixed bottom-0 left-0 right-0 p-3 shadow-xl">
        <div className="flex flex-col items-center justify-center text-gray-0 text-xl mb-[5rem]">
          <p className="animate-pulse">{text}</p>
        </div>

        <div className="flex items-center justify-center mb-20">
          <MoveButton text="메인으로 돌아가기" path="/detection" />
        </div>

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
              audioUrl ? "bg-blue-500" : "bg-blue-300"
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
