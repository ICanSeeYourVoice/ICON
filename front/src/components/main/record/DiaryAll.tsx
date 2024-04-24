import React from "react";

interface DiaryAllProps {
  title?: string;
  content?: string;
}

const DiaryAll: React.FC<DiaryAllProps> = ({ title = "", content = "" }) => {
  const notPrompt = !title || !content;
  const DiaryAllTitle =
    title.length > 0 ? title : title || "일지를 작성해주세요";

  const DiaryAllContent =
    content.length > 0 ? content : content || "일지를 작성해주세요";

  return (
    <div className="w-[16rem] h-[10rem] bg-white rounded-[1rem] shadow border">
      {notPrompt ? (
        <div className="mx-5 flex items-center justify-center h-full">
          <div className="flex items-center justify-center h-full">
            <div className="text-slate-400 text-[0.7rem]">
              오늘의 일지를 작성해주세요
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mx-5 ">
            <div className="text-slate-500 text-[0.73rem] my-1.5">
              <div className="whitespace-normal break-words">
                {DiaryAllTitle}
              </div>
            </div>
            <div className="w-[13rem] border border-zinc-100"></div>
            <div className="text-black text-[0.7rem] my-2">
              <div className="whitespace-normal break-words">
                {DiaryAllContent}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DiaryAll;
