import Vector from "../../../src/assets/svgs/nav/Vector.svg";
import { useState } from "react";
import LabelTextInput from "../../components/common/Input/LabelTextInput";
import PostButton from "../../components/common/button/PostButton";
import { useNavigate } from "react-router-dom";
import FileUploadInput from "../../components/main/record/FileUploadInput";
import { useEmojiStore, useImageStore } from "../../stores/diary";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { diaryRegister } from "../../apis/Diary";
import toast from "react-hot-toast";

interface CreateDiaryProps {
  content: string;
  date: string;
  image_urls: string[];
  emoji: string;
}

const RegisterPage = () => {
  const queryClient = useQueryClient();
  const [contentValue, setContentValue] = useState("");
  const { previewUrls, clearImages } = useImageStore();
  const { setSelectedEmojiId } = useEmojiStore();
  const selectedEmojiUrl = useEmojiStore((state) => state.selectedEmojiId);
  const selectedDate: string | null = sessionStorage.getItem("date");
  const navigate = useNavigate();

  // 일지 등록
  const { mutate: registerDiary } = useMutation({
    mutationFn: diaryRegister,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["DiaryList"],
      });
      clearImages();
      setSelectedEmojiId(null);
      navigate("/record/diary");
    },
    onError: (error) => {
      console.error("일지 등록 실패: error", error);
    },
  });

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentValue(e.target.value);
  };

  const createDiary = () => {
    if (!selectedDate || contentValue === "" || selectedEmojiUrl === null) {
      toast.error("일지 등록을 위해 모든 필드를 채워주세요");

      return;
    }

    const diaryData: CreateDiaryProps = {
      content: contentValue,
      date: selectedDate,
      image_urls: previewUrls,
      emoji: selectedEmojiUrl,
    };

    registerDiary(diaryData);
  };

  const handleTopClick = () => {
    navigate(-1);
    setSelectedEmojiId(null);
    clearImages();
  };

  return (
    <div className="flex flex-col items-center h-screen w-screen gap-[2rem]">
      <div className="bg-white z-10 flex flex-col items-center w-full h-[6rem] fixed">
        <div className="m-auto w-[80%]">
          <div className="flex justify-between items-center font-bold">
            <button onClick={handleTopClick}>
              <img src={Vector} alt="Back" />
            </button>
            <div>일지 등록</div>
            <div className="w-[16px]"></div>
          </div>
        </div>
      </div>
      <div className="mt-[8rem]">
        {selectedDate ? (
          <div>
            <span className="text-[1.5rem] font-semibold text-blue-500">
              {selectedDate}
            </span>
          </div>
        ) : (
          <div className="text-[1.3rem] text-red-500 font-semibold">
            날짜를 선택해주세요
          </div>
        )}
      </div>
      <div>
        <LabelTextInput
          label="내용"
          placeholder="내용 입력.."
          value={contentValue}
          onChange={handleContentChange}
        />
      </div>
      <div>
        <FileUploadInput />
      </div>
      <div className="fixed bottom-[4rem]">
        <PostButton label="등록하기" onClick={createDiary} />
      </div>
    </div>
  );
};

export default RegisterPage;
