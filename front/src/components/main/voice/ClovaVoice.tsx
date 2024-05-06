import { useState } from "react";
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
import Nav from "../../common/Navigator/Nav";

const ClovaVoice = () => {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [gender, setGender] = useState("female");

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
    {
      label:
        "엄마가 섬그늘에 굴따러 가면 아기가 혼자남아 집을 보다가 바다가 불러주는 자장 노래에 팔베고 스르르르 잠이 듭니다",
      voiceText:
        "엄마가 섬그늘에 굴따러 가면 아기가 혼자남아 집을 보다가 바다가 불러주는 자장 노래에 팔베고 스르르르 잠이 듭니다",
    },
    { label: "내가 가고있어 기다려", voiceText: "내가 가고 있어 기다려" },
    { label: "내가 가고있어 기다려", voiceText: "내가 가고 있어 기다려" },
  ];

  const handleSubmit = () => {
    if (!text.trim()) {
      toast.error("텍스트를 입력해주세요");
      return;
    }
    const voiceData = {
      text: text,
      speaker: gender === "male" ? "njonghyeok" : "nara ",
    };
    fetchVoice(voiceData);
  };

  const handleGenderChange = (newGender: string) => {
    setGender(newGender);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setText(event.target.value);

  const handleFirstVoice = (voiceText: string) => {
    const voiceData = { text: voiceText, speaker: "njonghyeok" };
    fetchVoice(voiceData);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-[6rem]">
      <div className="flex justify-start w-[18rem]">
        <button
          className={`p-2 ${gender === "male" ? "bg-blue-500" : "bg-gray-300"}`}
          onClick={() => handleGenderChange("male")}
        >
          남자
        </button>
        <button
          className={`p-2 ${
            gender === "female" ? "bg-blue-500" : "bg-gray-300"
          }`}
          onClick={() => handleGenderChange("female")}
        >
          여자
        </button>
      </div>
      <div className="flex justify-between w-[20rem] h-[7rem] border-b border-t p-3">
        <div>
          <input
            type="text"
            placeholder="아기에게 말해보세요"
            value={text}
            onChange={handleTextChange}
          />
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className={`w-[2rem] h-[2rem] flex items-center  rounded-full p-2 ${
              audioUrl ? "bg-blue-500" : "bg-blue-300"
            }`}
          >
            <img src={mic} alt="Send" />
          </button>
        </div>
      </div>
      <div className="mt-[0.8rem]">
        {!audioUrl && (
          <div>
            <WaveSurferComponent />
          </div>
        )}
        {audioUrl && <WaveSurferComponent audioUrl={audioUrl} />}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white shadow-xl">
        <div className="gap-1 mb-[3rem]">
          <div className="text-gray-500 mb-[0.2rem] text-[1.2rem]">
            즐겨찾기 문구
          </div>
          {buttons.map((button, index) => (
            <PriButton
              key={index}
              label={button.label}
              onClick={() => handleFirstVoice(button.voiceText)}
            />
          ))}
          {buttons.length < 3 && <PlusButton />}
        </div>
      </div>
      <Nav />
    </div>
  );
};
export default ClovaVoice;
