import { useEffect, useState } from "react";
import MoveButton from "../../common/button/MoveButton";
import mic from "../../../assets/svgs/voice/mic.svg";
import WaveSurferComponent from "./Wave";
import "./VoiceWave.css";
import { useMutation } from "@tanstack/react-query";
import { clovaVoice } from "../../../apis/Voice";
import toast from "react-hot-toast";
import axios from "axios";
import PriButton from "../../common/button/PriButton";
import PlusButton from "../../common/button/PlusButton";
import React from "react";
import { useNavigate } from "react-router-dom";

const ClovaVoice = () => {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [plusButtonText, setPlusButtonText] = useState("등록하기");

  const navigate = useNavigate();

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
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 503) {
          toast.error("정확한 문장을 작성해주세요");
        }
      } else {
        toast.error("문제가 발생했습니다. 관리자에게 문의하세요.");
      }
      console.error("API 에러:", error);
    },
  });

  const buttons = [
    { label: "엄마가 간다", voiceText: "엄마 가고 있어 기다려" },
    { label: "내가 가고있어 기다려", voiceText: "내가 가고 있어 기다려" },
    { label: "내가 가고있어 기다려", voiceText: "내가 가고 있어 기다려" },
  ];

  useEffect(() => {
    setPlusButtonText(buttons.length === 3 ? "수정하기" : "등록하기");
  }, [buttons.length]);

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

  const handleFirstVoice = (voiceText: string) => {
    const voiceData = { text: voiceText, speaker: "nara" };
    fetchVoice(voiceData);
  };

  const handleClovaRegister = () => {
    navigate("/voice/register");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {!audioUrl && (
        <div className="mt-[1.2rem]">
          <WaveSurferComponent />
        </div>
      )}
      {audioUrl && <WaveSurferComponent audioUrl={audioUrl} />}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white shadow-xl">
        <div className="grid grid-cols-2 gap-1 mb-[1rem]">
          {buttons.map((button, index) => (
            <PriButton
              key={index}
              label={button.label}
              onClick={() => handleFirstVoice(button.voiceText)}
            />
          ))}
          <PlusButton onClick={handleClovaRegister} text={plusButtonText} />
        </div>

        <div className="flex items-center justify-center mb-[2rem]">
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
