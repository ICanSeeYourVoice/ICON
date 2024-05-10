import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const SmallButton: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center w-[9.375rem] h-[2.5625rem] m-[0.125rem] bg-gradient-to-r from-linear-0 to-linear-100 rounded-[1.9375rem] text-sm text-[0.8rem] text-center text-white"
    >
      {label}
    </button>
  );
};

export default SmallButton;
