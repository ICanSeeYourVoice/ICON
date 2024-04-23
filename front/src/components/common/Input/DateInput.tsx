import React from "react";

interface LabelInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabelInput: React.FC<LabelInputProps> = ({ value, onChange }) => {
  return (
    <div className="w-[270px] h-[50px] relative flex-col justify-start items-start inline-flex mt-4">
      <div className="text-black text-sm mb-2">날짜</div>
      <div className="relative w-full">
        <input
          type="date"
          value={value}
          onChange={onChange}
          className="w-full rounded-[14px] border border-gray-300 bg-white text-stone-700 
          text-sm p-4 focus:outline-none focus:ring-1 focus:ring-gray-200"
          style={{ height: "3rem" }}
        />
      </div>
    </div>
  );
};

export default LabelInput;