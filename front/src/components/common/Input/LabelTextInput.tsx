import React from "react";

interface LabelTextInputProps {
  placeholder?: string;
  value?: string;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const LabelTextInput: React.FC<LabelTextInputProps> = ({
  label,
  onChange,
  placeholder,
  value,
}) => {
  return (
    <div>
      <div className="text-black text-sm mb-2">{label || "제목"}</div>
      <div
        className="w-[16rem] h-[8.3rem] relative flex-col justify-start 
        items-start inline-flex  border rounded-[15px] border-gray-300"
      >
        <textarea
          placeholder={placeholder || "내용 입력..."}
          value={value}
          onChange={onChange}
          className="w-full h-full rounded-[15px] bg-white
        text-stone-400 text-sm 
        p-4 focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none"
          style={{ overflow: "auto" }}
        />
      </div>
    </div>
  );
};

export default LabelTextInput;
