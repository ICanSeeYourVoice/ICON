import React from "react";

interface DiaryThumbnailProps {
  title?: string;
  content?: string;
}

const DiaryThumbnail: React.FC<DiaryThumbnailProps> = ({
  title = "",
  content = "",
}) => {
  const notPrompt = !title || !content;
  const thumbnailTitle =
    title.length > 0
      ? `${title.substring(0, 20)}...`
      : title || "일지를 작성해주세요";

  const thumbnailContent =
    content.length > 0
      ? `${content.substring(0, 30)}...`
      : content || "일지를 작성해주세요";

  return (
    <div className="w-[14.5rem] h-[5rem] bg-white rounded-[0.5rem] shadow border">
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
              {thumbnailTitle}
            </div>
            <div className="w-[12rem] border border-zinc-100"></div>
            <div className="text-black text-[0.7rem] my-2">
              {thumbnailContent}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DiaryThumbnail;
