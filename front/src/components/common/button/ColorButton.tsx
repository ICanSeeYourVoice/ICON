import React from "react";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
  label: string;
  path: string;
}

const Button: React.FC<ButtonProps> = ({ label, path }) => {
  const navigate = useNavigate();
  const goPathClick = () => {
    navigate(`${path}`);
  };
  return (
    <div
      onClick={goPathClick}
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
