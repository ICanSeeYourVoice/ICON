import React from "react";

interface LabelInputProps {
  placeholder?: string;
  value?: string;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabelInput: React.FC<LabelInputProps> = ({
  label,
  onChange,
  placeholder,
}) => {
  return (
    <div className="w-[270px] h-[50px] relative flex-col justify-start items-start inline-flex mt-4">
      <div className="text-black text-sm mb-2">{label || "제목"}</div>
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

export default LabelInput;
