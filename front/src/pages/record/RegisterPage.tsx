import TopBar from "../../components/common/Navigator/TopBar";
import { useState } from "react";
import LabelTextInput from "../../components/common/Input/LabelTextInput";
import PostButton from "../../components/common/button/PostButton";
import { useNavigate } from "react-router-dom";
import FileUploadInput from "../../components/main/record/FileUploadInput";
import { useDateStore, useImageStore } from "../../stores/diary";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { diaryRegister } from "../../apis/Diary";
import moment from "moment";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const selectedDate = useDateStore((state) => state.selectedDate); // zustand
  const { previewUrls, clearImages } = useImageStore(); // zustand 이미지 경로
  const [contentValue, setContentValue] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 일지 등록
  const { mutate: registerDiary } = useMutation({
    mutationFn: diaryRegister,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["DiaryList"],
      });
      clearImages();
      navigate("/record/detail/diary");
    },
    onError: (error) => {
      console.error("일지 등록 실패: error", error);
    },
  });

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentValue(e.target.value);
  };

  const createDiary = () => {
    if (!selectedDate || contentValue === "") {
      toast.error("일지 등록을 위해 모든 필드를 채워주세요");
      return;
    }
    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");

    registerDiary({
      content: contentValue,
      date: formattedDate,
      image_urls: previewUrls,
    });
  };

  return (
    <div className="flex flex-col items-center h-screen w-screen gap-[2rem]">
      <TopBar text="일지 등록" />
      <div className="mt-[8rem]">
        {selectedDate ? (
          <div>
            <span className="text-[1.5rem] font-semibold text-blue-500">
              {selectedDate.toLocaleDateString()}
            </span>
            <span className="ml-[0.3rem]"> 일지 작성하기</span>
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
