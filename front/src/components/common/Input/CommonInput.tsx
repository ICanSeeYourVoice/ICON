import React from "react";

interface CommonInputProps {
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CommonInput: React.FC<CommonInputProps> = ({ onChange, placeholder }) => {
  return (
    <div className="w-[15.25rem] h-[2.9375rem] relative flex-col justify-start items-start inline-flex  border rounded-[0.875rem] border-gray-300">
      <input
        type="text"
        placeholder={placeholder || "텍스트"}
        onChange={onChange}
        className="w-full h-full rounded-[0.875rem] bg-white
         text-stone-400 text-sm 
        p-4 focus:outline-none focus:ring-1 focus:ring-gray-300"
      />
    </div>
  );
};

export default CommonInput;
