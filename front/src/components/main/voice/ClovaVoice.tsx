import { useState } from "react";
import Check from "../../../assets/svgs/voice/check.svg";
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
import { PulseLoader } from "react-spinners";

interface VoiceEntry {
  id: number;
  text: string;
}

const ClovaVoice = () => {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | string | null>(null);
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

  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <PulseLoader color="#7ec3f0" />
      </div>
    );
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
    setAudioUrl("");
    setText("");
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (event.target.value) {
      setText("");
      setSelectedId("input");
      setAudioUrl("");
    }
  };

  const handleFirstVoice = (voiceText: string, id: number) => {
    setText(voiceText);
    setSelectedId(id);
    const speakerId = gender === "male" ? "njonghyeok" : "nara";
    fetchVoice({ text: voiceText, speaker: speakerId });
  };

  return (
    <div className="flex flex-col  items-center justify-center mt-[6rem]">
      <div className="w-[22rem] h-[18rem]  border-gray-300 border-[0.1rem] bg-gray-100 rounded-[1rem] shadow-lg flex flex-col justify-center items-center p-4">
        {/* 남자 여자 토글 */}
        <div className="flex justify-start w-full mb-[1rem]">
          <button
            className={`flex-1 p-2 transition-colors duration-300 ease-in-out ${
              gender === "female"
                ? "bg-primary text-white shadow-lg"
                : "bg-gray-200 hover:bg-gray-300"
            } rounded-l-lg`}
            onClick={() => handleGenderChange("female")}
          >
            여자
          </button>
          <button
            className={`flex-1 p-2 transition-colors duration-300 ease-in-out ${
              gender === "male"
                ? "bg-primary text-white shadow-lg"
                : "bg-gray-200 hover:bg-gray-300"
            } rounded-r-lg`}
            onClick={() => handleGenderChange("male")}
          >
            남자
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
        {/* 텍스트 인풋 */}
        <div className="flex justify-between items-center w-full mt-[1rem]">
          <div className="w-full mr-2">
            <textarea
              rows={4}
              placeholder="아기에게 말해보세요"
              value={text}
              onFocus={handleFocus}
              onChange={handleTextChange}
              className="w-full h-[5rem] p-2 bg-gray-200 rounded-[1rem] focus:outline-none focus:ring-2
               focus:ring-gray-300 transition-shadow ease-in-out duration-300 "
            />
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className={`w-[2rem] h-[2rem] flex items-center justify-center rounded-full 
              p-2 transition-transform duration-300 ease-out transform hover:scale-110 bg-blue-300`}
            >
              <img src={Check} alt="Send" />
            </button>
          </div>
        </div>
      </div>

      {/* 즐겨찾기 문구 */}
      <div className="fixed bottom-[3.5rem] pt-3 pl-3 pr-3 bg-white shadow-xl rounded-[1rem]  border-gray-300 border-[0.1rem]">
        <div className="text-gray-500 mb-[0.5rem] text-[1.1rem] ml-[0.5rem]">
          즐겨찾기 문구
        </div>
        {voices.length >= 0 && voices.length < 3 ? (
          <>
            {voices.map((voice, index) => (
              <PriButton
                key={index}
                id={voice.id}
                label={voice.text}
                onClick={() => handleFirstVoice(voice.text, voice.id)}
                isSelected={selectedId === voice.id}
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
              onClick={() => handleFirstVoice(voice.text, voice.id)}
              isSelected={selectedId === voice.id}
            />
          ))
        )}
      </div>
      <Nav />
    </div>
  );
};
export default ClovaVoice;
