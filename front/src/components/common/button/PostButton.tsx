import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-primary w-[15.25rem] mt-2 h-[3rem] text-white  rounded-full focus:outline-none focus:ring-1 focus:ring-blue-200 "
    >
      {label}
    </button>
  );
};

export default Button;
