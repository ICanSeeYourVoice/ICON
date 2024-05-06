import { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./StyledCalender.css";
import moment from "moment";

interface DiaryEntryProps {
  diaryDate: string;
  title: string;
  content: string;
  diaryImages: string[];
}

const ReactCalendar = () => {
  const [value, setValue] = useState<Date>(new Date());
  const monthOfActiveDate: string = moment(value).format("YYYY-MM");
  const [activeMonth, setActiveMonth] = useState<string>(monthOfActiveDate);
  const [selectedDiary, setSelectedDiary] = useState<DiaryEntryProps | null>(
    null
  );

  const getActiveMonth = (activeStartDate: Date | null) => {
    if (activeStartDate) {
      const newActiveMonth: string = moment(activeStartDate).format("YYYY-MM");
      setActiveMonth(newActiveMonth);
    }
  };

  const dayList: DiaryEntryProps[] = [
    {
      diaryDate: "2024-03-10",
      title: "오늘 있었던 일",
      content: "오늘 우리 아기가 활짝 웃었다",
      diaryImages: ["경로", "경로2", "경로3"],
    },
    {
      diaryDate: "2024-04-20",
      title: "오늘은 날씨가 좋다",
      content: "오늘 우리 아기가 날씨를 보고 활짝 웃었다",
      diaryImages: ["경로", "경로2", "경로3"],
    },
    {
      diaryDate: "2024-05-05",
      title: "오늘은 아기가 토했다",
      content: "오늘 우리 아기가 아팠나보다 울더라",
      diaryImages: ["경로", "경로2", "경로3"],
    },
    {
      diaryDate: "2024-05-06",
      title: "밖에 비온는 날 있었던 일",
      content: "밖에 비가오는데도 활짝 웃었다",
      diaryImages: ["경로", "경로2"],
    },
    {
      diaryDate: "2024-05-02",
      title: "옆집 아기",
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

  return (
    <div>
      <Calendar
        locale="kr"
        onChange={handleChange}
        value={value}
        next2Label={null}
        prev2Label={null}
        formatDay={(_, date) => moment(date).format("D")}
        tileContent={addContent}
        showNeighboringMonth={false}
        onActiveStartDateChange={({ activeStartDate }) =>
          getActiveMonth(activeStartDate)
        }
      />
      <div className="mt-[1rem]">
        <div className="flex mb-[0.5rem]">
          <div className="mr-[1rem] justify-center items-center flex">😎</div>
          <div className="text-[0.8rem]">
            <div>{activeMonth}</div>
            <div>요일</div>
          </div>
        </div>
        <div className="w-[22rem]">
          {selectedDiary ? (
            <div className="h-[9rem] justify-center items-center bg-blue-100 rounded-lg overflow-auto p-3">
              <div className="font-bold">{selectedDiary.title}</div>
              <div className="text-gray-700 text-sm my-1">
                {selectedDiary.content}
              </div>
              <div className="flex overflow-x-auto space-x-3 p-3">
                {selectedDiary.diaryImages.slice(0, 6).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index}`}
                    className="flex-none w-[7rem] h-[7rem] object-cover"
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="h-36 flex justify-center items-center bg-blue-100 rounded-lg">
              <div className="text-lg text-blue-300 animate-pulse">
                일지가 없어요. 일지를 작성해주세요.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReactCalendar;
