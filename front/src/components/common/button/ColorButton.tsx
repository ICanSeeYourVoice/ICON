import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-[150px] h-[41px] relative flex justify-center items-center"
    >
      <div className="w-[9.38rem] h-[2.56rem] left-0 top-0 absolute bg-gradient-to-r from-rose-300 to-indigo-400 rounded-[1.9375rem]" />
      <div
        className="absolute text-center text-white text-[0.9rem] font-normal leading-[41px] w-full"
        style={{ letterSpacing: "1px" }}
      >
        {label}
      </div>
    </div>
  );
};

export default Button;
