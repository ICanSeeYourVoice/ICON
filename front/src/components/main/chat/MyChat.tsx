import React from "react";

const MyChat: React.FC<{ text: string; timestamp: Date }> = ({
  text,
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
    <div className="flex justify-end w-[18rem] mb-[1rem]">
      <div className="text-black text-[0.6rem] mt-1 self-end">
        {formatTime(timestamp)}
      </div>
      <div className="min-h-[3.5rem] w-[11rem] bg-blue-400 rounded-tl-[1rem] rounded-bl-[1rem] rounded-br-[1rem] p-3 flex justify-end items-center">
        <div className="text-white text-[0.8rem] font-normal break-words overflow-hidden text-right">
          {text}
        </div>
      </div>
    </div>
  );
};

export default MyChat;
