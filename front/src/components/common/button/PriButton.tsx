import React from "react";
import Volume from "../../../assets/svgs/voice/volume.svg";
import Trash from "../../../assets/svgs/voice/Trash.svg";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <div className="flex justify-center">
      <div className="w-[20rem] h-[4.8rem] p-2 border-b border-gray-300 ">
        <div className=" text-[0.8rem] truncate">{label}</div>
        <div className="flex justify-between mt-[0.3rem] ">
          <div className="flex justify-center items-center  rounded-[1rem] w-[1.5rem] h-[1.5rem] border-2 bg-gray-500">
            <img src={Trash} alt="" />
          </div>
          <div
            onClick={onClick}
            className="flex justify-center items-center  rounded-[1rem] w-[1.5rem] h-[1.5rem] border-2 bg-primary "
          >
            <img src={Volume} alt="sound" className="w-[1rem] h-[1rem]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Button;
