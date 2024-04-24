import React from "react";

interface BotProps {
  text: string;
}

const BotChat: React.FC<BotProps> = ({ text }) => {
  return (
    <div className="flex justify-start w-[18rem] mb-[1rem]">
      <div className="min-h-[3.5rem] w-[13rem] bg-gray-500 rounded-tr-[1rem] rounded-bl-[1rem] rounded-br-[1rem] p-3 flex justify-start items-center">
        <div className="text-white text-[0.8rem] font-normal break-words overflow-hidden text-left">
          {text}
        </div>
      </div>
    </div>
  );
};

export default BotChat;
