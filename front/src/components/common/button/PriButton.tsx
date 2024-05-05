import React from "react";
import Volume from "../../../assets/svgs/voice/volume.svg";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <div className="w-screen p-2">
      <div
        onClick={onClick}
        className="flex  items-center justify-center w-[10rem] h-[6rem] p-2 text-primary rounded-[1rem] bg-blue-100 border border-primary shadow-lg overflow-hidden"
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
        }}
      >
        <div className="flex justify-center items-center  rounded-[1rem] w-[1.5rem] h-[1.5rem] border-2  bg-primary ">
          <img src={Volume} alt="sound" className="w-[1rem] h-[1rem]" />
        </div>
        <div className="mt-1">{label}</div>
      </div>
    </div>
  );
};

export default Button;
