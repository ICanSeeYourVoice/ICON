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
    <div>
      <div className="text-black text-sm mb-2">{label || "제목"}</div>
      <div
        className="w-[15.25rem] h-[2.9375rem] relative flex-col justify-start 
        items-start inline-flex  border rounded-[15px] border-gray-300"
      >
        <input
          type="text"
          placeholder={placeholder || "텍스트"}
          onChange={onChange}
          className="w-full h-full rounded-[15px] bg-white
        text-stone-400 text-sm 
       p-4 focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
      </div>
    </div>
  );
};

export default LabelInput;
