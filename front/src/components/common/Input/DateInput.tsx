import React from "react";

interface LabelInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabelInput: React.FC<LabelInputProps> = ({ value, onChange }) => {
  return (
    <div className="w-[17rem] h-[2.9375rem] relative flex-col justify-start items-start inline-flex mt-4 ">
      <div className="text-black text-sm mb-2">날짜</div>
      <div className="relative w-full border rounded-[0.875rem]">
        <input
          type="date"
          value={value}
          onChange={onChange}
          className="w-full rounded-[14px] border bg-white 
          text-sm p-4 focus:outline-none focus:ring-1 focus:ring-gray-200"
          style={{ height: "3rem" }}
        />
      </div>
    </div>
  );
};

export default LabelInput;
