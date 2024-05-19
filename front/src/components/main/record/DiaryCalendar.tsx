import { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./StyledCalender.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDateStore } from "../../../stores/diary";
import { useQuery } from "@tanstack/react-query";
import { diaryList } from "../../../apis/Diary";
import Clude1 from "../../../assets/svgs/record/1.png";
import Clude2 from "../../../assets/svgs/record/2.png";
import Clude4 from "../../../assets/svgs/record/3.png";
import Clude3 from "../../../assets/svgs/record/4.png";
import Clude5 from "../../../assets/svgs/record/5.png";
import Clude6 from "../../../assets/svgs/record/6.png";
import Clude7 from "../../../assets/svgs/record/7.png";
import Clude8 from "../../../assets/svgs/record/8.png";
import Clude9 from "../../../assets/svgs/record/9.png";

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
  const { setSelectedDate } = useDateStore();
  const navigate = useNavigate();

  // 일지 데이터 받아오기
  const { data: dayList = [] } = useQuery<DiaryEntryProps[]>({
    queryKey: ["DiaryList"],
    queryFn: () => diaryList({ startId: "2024-01-01", endId: "2024-12-31" }),
  });

  const images: ImageMap = {
    clude9: { id: "clude", url: Clude9 },
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
      sessionStorage.setItem("date", dateStr);
      navigate("/record/diary/detail", { state: { dateStr } });
    }
  };

  // 일지 작성한 날 이모지로 체크
  const addContent = ({ date }: { date: Date }) => {
    const dateStr = moment(date).format("YYYY-MM-DD");
    const diaryEntry = dayList.find((entry) => entry.date === dateStr);

    if (diaryEntry) {
      return (
        <div className="w-[2.3rem] h-[2.3rem] flex justify-center items-center">
          <img
            src={images[diaryEntry.emoji].url}
            alt={`${diaryEntry.emoji} emoji`}
          />
        </div>
      );
    }
    return;
  };

  // 미래 일지 작성 금지
  const tileDisabled = ({ date }: { date: Date }) => date > new Date();

  return (
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
        tileDisabled={tileDisabled}
      />
    </div>
  );
};

export default DiaryCalendar;
