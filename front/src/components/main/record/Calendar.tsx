import { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./StyledCalender.css";
import moment from "moment";
import MoveButton from "../../common/button/MoveButton";
import { useQuery } from "@tanstack/react-query";
import { diaryList } from "../../../apis/Diary";
import { useDateStore } from "../../../stores/diary";

interface DiaryEntryProps {
  diary_id: number;
  date: string;
  content: string;
  image_urls: string[];
}

const ReactCalendar = () => {
  const [value, setValue] = useState<Date>(new Date());
  const setSelectedDate = useDateStore((state) => state.setSelectedDate); // zustand
  const [selectedDiary, setSelectedDiary] = useState<DiaryEntryProps | null>(
    null
  );

  // 00월 00일 00요일 로 변환
  const getMonthName = (date: Date) => moment(date).format("MM-DD");
  const getDayName = (date: Date) => moment(date).format("dddd");

  const { data: dayList = [] } = useQuery<DiaryEntryProps[]>({
    queryKey: ["DiaryList"],
    queryFn: () => diaryList({ startId: "2024-01-01", endId: "2024-12-31" }),
  });

  const handleChange: CalendarProps["onChange"] = (newValue) => {
    if (newValue instanceof Date) {
      setValue(newValue);
      setSelectedDate(newValue); // zustand
      const dateStr: string = moment(newValue).format("YYYY-MM-DD");
      const diaryEntry: DiaryEntryProps | undefined = dayList.find(
        (entry) => entry.date === dateStr
      );
      setSelectedDiary(diaryEntry || null);
    } else if (Array.isArray(newValue) && newValue[0] instanceof Date) {
      setValue(newValue[0]);
      setSelectedDate(newValue[0]); // zustand
      const dateStr: string = moment(newValue[0]).format("YYYY-MM-DD");
      const diaryEntry: DiaryEntryProps | undefined = dayList.find(
        (entry) => entry.date === dateStr
      );
      setSelectedDiary(diaryEntry || null);
    } else {
      setValue(new Date());
      setSelectedDate(new Date()); // zustand
      setSelectedDiary(null);
    }
  };

  // 일지 작성한 날 이모지로 체크

  const addContent = ({ date }: { date: Date }) => {
    const dateStr: string = moment(date).format("YYYY-MM-DD");
    const diaryEntry: DiaryEntryProps | undefined = dayList.find(
      (entry) => entry.date === dateStr
    );

    if (diaryEntry) {
      return (
        <div key={dateStr} className="emoji">
          <span role="img" aria-label="smile">
            😁
          </span>
        </div>
      );
    }
    return <div />;
  };

  return (
    <div>
      <div className="flex justify-center items-center">
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
      <div className="mt-[0.5rem] border rounded-[1rem] bg-blue-200">
        <div className="flex mb-[0.3rem] p-2 ">
          <div className="ml-[1rem] mr-[1rem] justify-center items-center flex">
            😎
          </div>
          <div className="text-[0.8rem]">
            <div>{getMonthName(value)}</div>
            <div>{getDayName(value)}</div>
          </div>
        </div>
        <div className="w-[21rem] h-[9rem] ">
          {selectedDiary ? (
            <div className="justify-center items-center bg-blue-100 rounded-b-[1rem] overflow-auto p-1">
              <div className="flex overflow-x-auto space-x-3 p-3">
                {selectedDiary.image_urls.slice(0, 6).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index}`}
                    className="flex-none w-[10rem] h-[10rem] object-cover"
                  />
                ))}
              </div>
              <div className="text-gray-700 text-sm pl-[1rem] ">
                {selectedDiary.content}
              </div>
            </div>
          ) : (
            <div className="h-[9rem] flex justify-center items-center rounded-b-[1rem]  bg-blue-100 ">
              <div className="text-lg text-blue-300 animate-pulse">
                일지가 없어요. 일지를 작성해주세요.
              </div>
              <div className="fixed bottom-[4.5rem] ">
                <MoveButton
                  path="/record/diary/register"
                  text="일지 추가하기"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReactCalendar;