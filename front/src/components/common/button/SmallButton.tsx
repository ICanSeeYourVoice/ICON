import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const SmallButton: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-primary w-[6.25rem] mt-2 h-[2rem] text-white  rounded-full focus:outline-none focus:ring-1 focus:ring-blue-200 text-sm"
    >
      {label}
    </button>
  );
};

export default SmallButton;
