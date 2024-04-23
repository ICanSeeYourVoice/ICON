import React from "react";

interface CommonInputProps {
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CommonInput: React.FC<CommonInputProps> = ({ onChange, placeholder }) => {
  return (
    <div className="w-[270px] h-[50px] relative flex-col justify-start items-start inline-flex mt-4">
      <input
        type="text"
        placeholder={placeholder || "텍스트"}
        onChange={onChange}
        className=" w-full h-full rounded-[14px] border border-gray-300 bg-white text-stone-700 text-sm 
        p-4 focus:outline-none focus:ring-1 focus:ring-gray-200"
      />
    </div>
  );
};

export default CommonInput;
