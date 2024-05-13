import Vector from "../../../src/assets/svgs/nav/Vector.svg";
import { useState } from "react";
import LabelTextInput from "../../components/common/Input/LabelTextInput";
import PostButton from "../../components/common/button/PostButton";
import { useNavigate } from "react-router-dom";
import FileUploadInput from "../../components/main/record/FileUploadInput";
import { useEmojiStore, useImageStore } from "../../stores/diary";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { diaryList, diaryRegister } from "../../apis/Diary";
import toast from "react-hot-toast";
import moment from "moment";

interface CreateDiaryProps {
  content: string;
  date: string;
  image_urls: string[];
  emoji: string;
}

interface DiaryEntryProps {
  diary_id: number;
  date: string;
  content: string;
  image_urls: string[];
  emoji: string;
}

const RegisterPage = () => {
  const queryClient = useQueryClient();
  const [contentValue, setContentValue] = useState("");
  const { previewUrls, clearImages } = useImageStore();
  const { setSelectedEmojiId } = useEmojiStore();
  const selectedEmojiUrl = useEmojiStore((state) => state.selectedEmojiId);
  const today = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const navigate = useNavigate();

  // 일지 데이터 받아오기
  const { data: dayList = [] } = useQuery<DiaryEntryProps[]>({
    queryKey: ["DiaryList"],
    queryFn: () => diaryList({ startId: "2024-01-01", endId: "2024-12-31" }),
  });

  // 이미 등록되어있는 날짜 추출
  const registeredDates: string[] = dayList.map((diary) => diary.date);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    if (registeredDates.includes(newDate)) {
      toast.error("이미 일지가 등록된 날짜입니다. ");
      return;
    }
    setSelectedDate(newDate);
  };

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
      <div className="bg-white z-10 flex flex-col items-center w-full h-[6rem] fixed m-auto w-[80%]">
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
      <div className="flex w-[13rem] mt-[8rem] justify-center">
        <div className="text-[1.5rem] font-semibold text-blue-500 ">
          {selectedDate}
        </div>
        <div className="ml-[1rem] rounded-[0.6rem] border-gray-500 border-[0.1rem] w-[2.2rem] h-[2.2rem] justify-center items-center">
          <input
            type="date"
            className="w-[1.2rem] ml-[0.4rem] h-[2rem]"
            onChange={handleDateChange}
            value={selectedDate}
            max={today}
          />
        </div>
      </div>
      <div className="appearance-none">
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
