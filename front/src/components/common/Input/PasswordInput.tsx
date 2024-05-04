import React from "react";

interface LabelPasswordInputProps {
  placeholder?: string;
  value?: string;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabelPasswordInput: React.FC<LabelPasswordInputProps> = ({
  label,
  onChange,
  placeholder,
  value,
}) => {
  return (
    <div>
      <div className="text-black text-sm mb-2">{label || ""}</div>
      <div
        className="w-[15.5rem] h-[3rem] relative flex-col justify-start 
        items-start inline-flex border rounded-[1rem] border-gray-300"
      >
        <input
          type="password"
          placeholder={placeholder || "비밀번호를 입력하세요"}
          value={value}
          onChange={onChange}
          className="w-full h-full rounded-[1rem] bg-white
          text-stone-400 text-sm 
          p-4 focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none"
          style={{ overflow: "hidden" }}
        />
      </div>
    </div>
  );
};

export default LabelPasswordInput;
