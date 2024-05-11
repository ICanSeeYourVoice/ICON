import { useState } from "react";
import mic from "../../../assets/svgs/voice/mic.svg";
import WaveSurferComponent from "./Wave";
import "./VoiceWave.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { clovaVoice } from "../../../apis/Voice";
import toast from "react-hot-toast";
import axios from "axios";
import PriButton from "../../common/button/PriButton";
import PlusButton from "../../common/button/PlusButton";
import React from "react";
import Nav from "../../common/Navigator/Nav";
import { AllVoice } from "../../../apis/Voice";

interface VoiceEntry {
  id: number;
  text: string;
}

const ClovaVoice = () => {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [gender, setGender] = useState("female");

  // naver clova voice API
  const { mutate: fetchVoice } = useMutation({
    mutationFn: clovaVoice,
    onSuccess: (data) => {
      if (data instanceof Blob) {
        const audioBlobUrl = URL.createObjectURL(data);
        setAudioUrl(audioBlobUrl);
      } else {
        console.error("데이터 타입 :", data);
      }
      setText("");
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

  // voice 전체 데이터 가져오기
  const {
    data: voices = [],
    isLoading,
    isError,
  } = useQuery<VoiceEntry[]>({
    queryKey: ["voiceList"],
    queryFn: AllVoice,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>데이터 로딩 중 오류 발생</div>;

  const handleSubmit = () => {
    if (!text.trim()) {
      toast.error("텍스트를 입력해주세요");
      return;
    }
    const speakerId = gender === "male" ? "njonghyeok" : "nara";
    const voiceData = {
      text: text,
      speaker: speakerId,
    };
    fetchVoice(voiceData);
  };

  const handleGenderChange = (newGender: string) => {
    newGender === "male" ? "njonghyeok" : "nara";
    const speakerId = newGender;
    setGender(speakerId);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleFirstVoice = (voiceText: string) => {
    const speakerId = gender === "male" ? "njonghyeok" : "nara";
    const voiceData = { text: voiceText, speaker: speakerId };
    fetchVoice(voiceData);
  };

  return (
    <div className="flex flex-col border-[0.3rem] rounded-[1rem] items-center justify-center mt-[6rem]">
      <div className="w-[22rem] h-[23rem] border-[0.1rem] border-blue-100 bg-blue-100 rounded-lg shadow-lg flex flex-col justify-center items-center p-4">
        {/* 남자 여자 토글 */}
        <div className="flex justify-start w-full mb-4">
          <button
            className={`flex-1 p-2 transition-colors duration-300 ease-in-out ${
              gender === "male"
                ? "bg-blue-300 text-white shadow-lg"
                : "bg-gray-200 hover:bg-gray-300"
            } rounded-l-lg`}
            onClick={() => handleGenderChange("male")}
          >
            남자
          </button>
          {/* 텍스트 인풋 */}
          <button
            className={`flex-1 p-2 transition-colors duration-300 ease-in-out ${
              gender === "female"
                ? "bg-blue-300 text-white shadow-lg"
                : "bg-gray-200 hover:bg-gray-300"
            } rounded-r-lg`}
            onClick={() => handleGenderChange("female")}
          >
            여자
          </button>
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          {!audioUrl && (
            <div className="w-full flex justify-center">
              <WaveSurferComponent />
            </div>
          )}
          {audioUrl && (
            <div className="w-full flex justify-center">
              <WaveSurferComponent audioUrl={audioUrl} />
            </div>
          )}
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="w-full mr-2">
            <textarea
              rows={4}
              placeholder="아기에게 말해보세요"
              value={text}
              onChange={handleTextChange}
              className="w-full h-full p-2 bg-blue-200 rounded-[1rem] focus:outline-none focus:ring-2
               focus:ring-blue-300 transition-shadow ease-in-out duration-300 "
            />
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className={`w-[2rem] h-[2rem] flex items-center justify-center rounded-full p-2 transition-transform duration-300 ease-out transform hover:scale-110 ${
                audioUrl ? "bg-blue-500" : "bg-blue-300"
              }`}
            >
              <img src={mic} alt="Send" />
            </button>
          </div>
        </div>
      </div>

      {/* 즐겨찾기 문구 */}
      <div className=" p-3 bg-white shadow-xl">
        <div className="gap-1 mb-[4rem]">
          <div className="text-gray-500 mb-[0.5rem] text-[1.2rem] ml-[1rem]">
            즐겨찾기 문구
          </div>
          {voices.length >= 0 && voices.length < 3 ? (
            <>
              {voices.map((voice, index) => (
                <PriButton
                  key={index}
                  id={voice.id}
                  label={voice.text}
                  onClick={() => handleFirstVoice(voice.text)}
                />
              ))}
              <PlusButton />
            </>
          ) : (
            voices.map((voice, index) => (
              <PriButton
                key={index}
                id={voice.id}
                label={voice.text}
                onClick={() => handleFirstVoice(voice.text)}
              />
            ))
          )}
        </div>
      </div>
      <Nav />
    </div>
  );
};
export default ClovaVoice;
