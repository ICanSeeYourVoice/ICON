import React, { useState } from "react";
import CommonInput from "../../components/common/Input/CommonInput";
import PostButton from "../../components/common/button/PostButton";
import { useNavigate } from "react-router-dom";

const ClovaVoiceRegister = () => {
  const [inputFirstValue, setInputFirstValue] = useState("");
  const [inputSecondValue, setInputSecondValue] = useState("");
  const [inputThirdValue, setInputThirdValue] = useState("");
  const navigate = useNavigate();

  const handleInputFirstChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFirstValue(e.target.value);
  };
  const handleInputSecondChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSecondValue(e.target.value);
  };
  const handleInputThirdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputThirdValue(e.target.value);
  };

  const handleButtonClick = () => {
    navigate("/voice");
  };

  return (
    <div className="flex flex-col gap-7 p-4">
      <div>자주 사용하는 말을 등록해보세요.</div>
      <div className="text-red-500 text-xs mb-[2rem]">
        최대 3개까지 등록 가능합니다.
      </div>
      <div className="relative">
        <CommonInput
          placeholder="텍스트1"
          value={inputFirstValue}
          onChange={handleInputFirstChange}
        />
        <button className="absolute bottom-8 right-0 text-xs p-1 text-red-500 bg-gray-200 w-[1.5rem] h-[1.5rem] rounded-full">
          X
        </button>
      </div>
      <div className="relative">
        <CommonInput
          placeholder="텍스트2"
          value={inputSecondValue}
          onChange={handleInputSecondChange}
        />
        <button className="absolute bottom-8 right-0 text-xs p-1 text-red-500 bg-gray-200 w-[1.5rem] h-[1.5rem] rounded-full">
          X
        </button>
      </div>
      <div className="relative">
        <CommonInput
          placeholder="텍스트3"
          value={inputThirdValue}
          onChange={handleInputThirdChange}
        />
        <button className="absolute bottom-8 right-0 text-xs p-1 text-red-500 bg-gray-200 w-[1.5rem] h-[1.5rem] rounded-full">
          X
        </button>
      </div>
      <div className="mt-[5rem]">
        <PostButton label="돌아가기" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default ClovaVoiceRegister;
