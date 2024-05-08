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
    console.log(speakerId);
    fetchVoice(voiceData);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-[6rem]">
      {/* 텍스트 인풋 */}
      <div className="w-[22rem] h-[21rem] border-[0.3rem] border-primary rounded-[1rem]  justify-center items-center">
        {/* 남자 여자 토글 */}
        <div className="flex justify-start w-[18rem] mb-[1rem] p-1">
          <button
            className={`p-2 rounded-l ${
              gender === "male"
                ? "bg-primary border border-t border-b border-l"
                : "bg-gray-200"
            }`}
            onClick={() => handleGenderChange("male")}
          >
            남자
          </button>
          <button
            className={`p-2 rounded-r ${
              gender === "female"
                ? "bg-primary border border-t border-b border-r"
                : "bg-gray-200"
            }`}
            onClick={() => handleGenderChange("female")}
          >
            여자
          </button>
        </div>
        <div>
          {!audioUrl && (
            <div>
              <WaveSurferComponent />
            </div>
          )}
          {audioUrl && <WaveSurferComponent audioUrl={audioUrl} />}
        </div>
        <div className="flex justify-between items-center h-[7.5rem] border-b-[0.1rem] border-t-[0.1rem] p-3">
          <div>
            <textarea
              rows={4}
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
      </div>

      {/* 즐겨찾기 문구 */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white shadow-xl">
        <div className="gap-1 mb-[4rem]">
          <div className="text-gray-500 mb-[0.5rem] text-[1.2rem]">
            즐겨찾기 문구
          </div>
          {voices.length > 0 && voices.length < 3 ? (
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
