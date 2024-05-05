import React from "react";

const BotChat: React.FC<{ content: string; timestamp: Date }> = ({
  content,
  timestamp,
}) => {
  const formatTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const isPM = hours >= 12;
    const formattedHours = isPM ? hours - 12 : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${isPM ? "오후" : "오전"} ${formattedHours}:${formattedMinutes}`;
  };

  return (
    <div className="flex justify-start w-[18rem] mb-[1rem]">
      <div className=" max-w-[11rem] bg-gray-500 rounded-tr-[1rem] rounded-bl-[1rem] rounded-br-[1rem] p-3 flex items-center">
        <div className="text-white text-[0.8rem] font-normal break-words overflow-hidden">
          {content}
        </div>
      </div>
      <div className="text-black text-[0.6rem] mt-2 self-end ml-2">
        {formatTime(timestamp)}
      </div>
    </div>
  );
};

export default BotChat;
