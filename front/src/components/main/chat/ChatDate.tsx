import React from "react";

interface DateDisplayProps {
  date: Date;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ date }) => {
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <div className="w-[6rem] h-[1rem] relative">
      <div className="w-[5rem] h-[1rem] left-0 top-0 absolute bg-zinc-100 rounded-[1rem]" />
      <div className="tracking-wider left-[0.5rem] top-[0.2rem] absolute text-center text-slate-500 text-[0.48rem] ">
        {formatDate(date)}
      </div>
    </div>
  );
};

export default DateDisplay;
