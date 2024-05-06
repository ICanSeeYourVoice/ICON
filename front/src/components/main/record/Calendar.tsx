import { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./StyledCalender.css";
import moment from "moment";

const ReactCalendar = () => {
  const [value, setValue] = useState(new Date());
  const monthOfActiveDate = moment(value).format("YYYY-MM");
  const [activeMonth, setActiveMonth] = useState(monthOfActiveDate);

  const getActiveMonth = (activeStartDate: Date | null) => {
    if (activeStartDate) {
      const newActiveMonth = moment(activeStartDate).format("YYYY-MM");
      setActiveMonth(newActiveMonth);
    }
  };

  const dayList = [
    {
      diaryDate: "2024-03-10",
      title: "오늘 있었던 일",
      content: "오늘 우리 아기가 활짝 웃었다",
    },
    {
      diaryDate: "2024-04-20",
      title: "오늘은 날씨가 좋다",
      content: "오늘 우리 아기가 날씨를 보고 활짝 웃었다",
    },
    {
      diaryDate: "2024-05-05",
      title: "오늘은 아기가 토했다",
      content: "오늘 우리 아기가 아팠나보다 울더라",
    },
    {
      diaryDate: "2024-05-06",
      title: "밖에 비온는 날 있었던 일",
      content: "밖에 비가오는데도 활짝 웃었다",
    },
    {
      diaryDate: "2024-05-02",
      title: "옆집 아기",
      content: "오늘 우리 아기가 옆집 아기와 함께 활짝 웃었다",
    },
  ];

  const handleChange: CalendarProps["onChange"] = (newValue) => {
    if (newValue instanceof Date) {
      setValue(newValue);
    } else if (Array.isArray(newValue) && newValue[0] instanceof Date) {
      setValue(newValue[0]);
    } else {
      setValue(new Date());
    }
  };

  const addContent = ({ date }: { date: Date }) => {
    const dateStr = moment(date).format("YYYY-MM-DD");
    const diaryEntry = dayList.find((entry) => entry.diaryDate === dateStr);

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
      <p>선택된 날짜: {activeMonth}</p>
      <div></div>
    </div>
  );
};

export default ReactCalendar;
