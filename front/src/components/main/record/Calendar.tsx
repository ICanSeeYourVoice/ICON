import { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./StyledCalender.css";
import moment from "moment";
import MoveButton from "../../common/button/MoveButton";

interface DiaryEntryProps {
  diaryDate: string;
  content: string;
  diaryImages: string[];
}

const ReactCalendar = () => {
  const [value, setValue] = useState<Date>(new Date());
  const [selectedDiary, setSelectedDiary] = useState<DiaryEntryProps | null>(
    null
  );

  const dayList: DiaryEntryProps[] = [
    {
      diaryDate: "2024-03-10",
      content: "오늘 우리 아기가 활짝 웃었다",
      diaryImages: ["경로", "경로2", "경로3"],
    },
    {
      diaryDate: "2024-04-20",
      content: "오늘 우리 아기가 날씨를 보고 활짝 웃었다",
      diaryImages: ["경로", "경로2", "경로3"],
    },
    {
      diaryDate: "2024-05-05",
      content: "오늘 우리 아기가 아팠나보다 울더라",
      diaryImages: ["경로", "경로2", "경로3"],
    },
    {
      diaryDate: "2024-05-06",
      content:
        "밖에 비가오는데도 활짝 웃었다밖에 비가오는데도 활짝 웃었다밖에 비가오는데도 활짝 웃었다밖에 비가오는데도 활짝 웃었다밖에 비가오는데도 활짝 웃었다밖에 비가오는데도 활짝 웃었다",
      diaryImages: ["경로", "경로2"],
    },
    {
      diaryDate: "2024-05-02",
      content: "오늘 우리 아기가 옆집 아기와 함께 활짝 웃었다",
      diaryImages: ["경로", "경로2", "경로3", "경로4", "경로5", "경로6"],
    },
  ];
  const handleChange: CalendarProps["onChange"] = (newValue) => {
    if (newValue instanceof Date) {
      setValue(newValue);
      const dateStr: string = moment(newValue).format("YYYY-MM-DD");
      const diaryEntry: DiaryEntryProps | undefined = dayList.find(
        (entry) => entry.diaryDate === dateStr
      );
      setSelectedDiary(diaryEntry || null);
    } else if (Array.isArray(newValue) && newValue[0] instanceof Date) {
      setValue(newValue[0]);
      const dateStr: string = moment(newValue[0]).format("YYYY-MM-DD");
      const diaryEntry: DiaryEntryProps | undefined = dayList.find(
        (entry) => entry.diaryDate === dateStr
      );
      setSelectedDiary(diaryEntry || null);
    } else {
      setValue(new Date());
      setSelectedDiary(null);
    }
  };

  const addContent = ({ date }: { date: Date }) => {
    const dateStr: string = moment(date).format("YYYY-MM-DD");
    const diaryEntry: DiaryEntryProps | undefined = dayList.find(
      (entry) => entry.diaryDate === dateStr
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

  const getDayName = (date: Date) => moment(date).format("dddd");
  const getMonthName = (date: Date) => moment(date).format("MM-DD");

  return (
    <div>
      <div className="flex justify-center items-center">
        <Calendar
          locale="kr"
          onChange={handleChange}
          value={value}
          next2Label={null}
          prev2Label={null}
          formatDay={(_, date) => moment(date).format("D")}
          tileContent={addContent}
          showNeighboringMonth={false}
        />
      </div>
      <div className="mt-[0.5rem] ">
        <div className="flex mb-[0.3rem]">
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
            <div className="justify-center items-center bg-blue-100 rounded-[1rem] overflow-auto p-1">
              <div className="flex overflow-x-auto space-x-3 p-3">
                {selectedDiary.diaryImages.slice(0, 6).map((image, index) => (
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
            <div className="h-[9rem] flex justify-center items-center bg-blue-100 rounded-lg">
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
