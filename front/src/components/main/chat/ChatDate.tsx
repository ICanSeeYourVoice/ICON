import React from "react";

const DateDisplay: React.FC<{ date: Date }> = ({ date }) => {
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <div className="flex justify-center items-center h-[1rem] mb-[1.8rem]">
      <div className="bg-[#F3F3F3] text-sub-0 px-[0.8rem] py-[0.2rem] text-[0.5rem] rounded-full">
        <span>{formatDate(date)}</span>
      </div>
    </div>
  );
};

export default DateDisplay;
