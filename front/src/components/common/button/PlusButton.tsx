import React from "react";

interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <div className="w-screen p-2">
      <div
        onClick={onClick}
        className="flex  items-center justify-center w-[10rem] h-[6rem]"
      >
        <div
          className="flex items-center justify-center w-[6rem] h-[4rem] text-gray-500 rounded-[3rem] bg-gray-100 border
         border-gray-500 shadow-lg "
        >
          <div>{text}</div>
        </div>
      </div>
    </div>
  );
};

export default Button;
