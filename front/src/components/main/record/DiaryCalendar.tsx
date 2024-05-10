import { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./StyledCalender.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDateStore, useEmojiStore } from "../../../stores/diary";
import Arrow from "../../../assets/svgs/record/arrowRight.svg";
import { useQuery } from "@tanstack/react-query";
import { diaryList } from "../../../apis/Diary";
import Clude1 from "../../../assets/svgs/record/blueClude.png";
import Clude2 from "../../../assets/svgs/record/blueClude.png";
import Clude4 from "../../../assets/svgs/record/blueClude.png";
import Clude3 from "../../../assets/svgs/record/blueClude.png";
import Clude5 from "../../../assets/svgs/record/blueClude.png";
import Clude6 from "../../../assets/svgs/record/blueClude.png";
import Clude7 from "../../../assets/svgs/record/blueClude.png";
import Clude8 from "../../../assets/svgs/record/blueClude.png";
import Clude0 from "../../../assets/svgs/record/blueClude.png";

interface DiaryEntryProps {
  diary_id: number;
  date: string;
  content: string;
  image_urls: string[];
  emoji: string;
}

interface ImageMap {
  [key: string]: {
    id: string;
    url: string;
  };
}

const DiaryCalendar = () => {
  const [value, setValue] = useState<Date>(new Date());
  const [showModal, setShowModal] = useState(false);
  const selectedEmoji = useEmojiStore((state) => state.selectedEmojiId);
  const { setSelectedDate } = useDateStore();
  const { setSelectedEmojiId } = useEmojiStore();
  const navigate = useNavigate();

  // 일지 데이터 받아오기
  const { data: dayList = [] } = useQuery<DiaryEntryProps[]>({
    queryKey: ["DiaryList"],
    queryFn: () => diaryList({ startId: "2024-01-01", endId: "2024-12-31" }),
  });

  console.log(dayList, "ss");

  const images: ImageMap = {
    clude: { id: "clude", url: Clude0 },
    clude1: { id: "clude1", url: Clude1 },
    clude2: { id: "clude2", url: Clude2 },
    clude3: { id: "clude2", url: Clude3 },
    clude4: { id: "clude2", url: Clude4 },
    clude5: { id: "clude2", url: Clude5 },
    clude6: { id: "clude2", url: Clude6 },
    clude7: { id: "clude2", url: Clude7 },
    clude8: { id: "clude2", url: Clude8 },
  };

  // 날짜 변경
  const handleChange: CalendarProps["onChange"] = (newValue) => {
    if (newValue instanceof Date) {
      setValue(newValue);
      setSelectedDate(newValue);
      const dateStr = moment(newValue).format("YYYY-MM-DD");
      const diaryEntry = dayList.find((entry) => entry.date === dateStr);
      sessionStorage.setItem("date", dateStr);
      if (diaryEntry) {
        navigate("/record/diary/detail");
      }
    }
  };

  // 일지 작성한 날 이모지로 체크
  const addContent = ({ date }: { date: Date }) => {
    const dateStr = moment(date).format("YYYY-MM-DD");
    const diaryEntry = dayList.find((entry) => entry.date === dateStr);

    if (diaryEntry) {
      return (
        <div className="w-[1.8rem] h-[1.7rem] flex justify-center items-center">
          <img
            src={images[diaryEntry.emoji].url}
            alt={`${diaryEntry.emoji} emoji`}
          />
        </div>
      );
    }
    return;
  };

  // 선택한 이모지 zustand에 저장
  const handleEmojiClick = (id: string) => {
    setSelectedEmojiId(id);
  };

  const onModalClick = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedEmojiId(null);
  };
  return (
    <div>
      <div className="mt-[3rem] flex justify-center items-center border-gray-200 rounded-[1.3rem] shadow-xl">
        <Calendar
          locale="en-US"
          onChange={handleChange}
          value={value}
          next2Label={null}
          prev2Label={null}
          formatDay={(_, date) => moment(date).format("D")}
          tileContent={addContent}
          showNeighboringMonth={false}
        />
      </div>

      <div
        onClick={onModalClick}
        className="w-full justify-center flex items-center mt-[3rem]"
      >
        <div className="text-white fixed bottom-[5rem] w-[3rem] h-[3rem] flex justify-center items-center shadow-xl hover:bg-gray-400 bg-gray-300 text-[2rem] rounded-[1rem]">
          +
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-gray-100 pl-[1.5rem] pr-[1.5rem] pb-[1.5rem] pt-[1rem] rounded-[1rem] shadow-lg  ">
            <div className="w-full flex justify-end mb-[1rem]">
              <button className=" text-black" onClick={handleCancel}>
                x
              </button>
            </div>
            <div className="flex justify-center items-center mb-[2rem] text-sm">
              오늘의 감정을 골라보세요
            </div>
            <div className="grid grid-cols-3 gap-4 mb-[2rem]">
              {Object.entries(images).map(([id, { url }]) => (
                <img
                  key={id}
                  src={url}
                  alt="Emoji"
                  className={`rounded-full w-[3rem] h-[3rem] cursor-pointer ${
                    selectedEmoji === id ? "scale-125 shadow-lg" : ""
                  }`}
                  onClick={() => handleEmojiClick(id)}
                />
              ))}
            </div>
            <div className="flex justify-around">
              <button
                className="bg-gray-300 text-white py-1 px-1 rounded-[1rem] hover:bg-gray-400"
                onClick={() => {
                  setShowModal(false);
                  navigate("/record/diary/register");
                }}
              >
                <img src={Arrow} alt="arrow" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiaryCalendar;
