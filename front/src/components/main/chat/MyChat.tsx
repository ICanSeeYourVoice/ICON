import React from "react";

interface MyChatProps {
  text: string;
}

const MyChat: React.FC<MyChatProps> = ({ text }) => {
  return (
    <div className="flex justify-end w-[18rem] mb-[1rem]">
      <div className="min-h-[3.5rem] w-[13rem] bg-blue-300 rounded-tl-[1rem] rounded-bl-[1rem] rounded-br-[1rem] p-3 flex justify-end items-center">
        <div className="text-white text-[0.8rem] font-normal break-words overflow-hidden text-right">
          {text}
        </div>
      </div>
    </div>
  );
};

export default MyChat;
