import { useState } from "react";
import { useLocation } from "react-router-dom";
import LabelInput from "../../components/common/Input/DateInput";
import TopBar from "../../components/common/Navigator/TopBar";
import Nav from "../../components/common/Navigator/Nav";
import VerticalTimeLine from "../../components/main/record/timeline/VerticalTimeLine";

const ChartPage = () => {
  const location = useLocation();
  const { date } = location.state || {};
  const [selectDay, setSelectDay] = useState(date || "");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectDay(e.target.value);
  };

  return (
    <div className="flex flex-col items-center h-screen w-screen">
      <TopBar text="통계" path="record" />
      <main className="flex flex-col items-center justify-center w-full flex-1">
        <div className="flex flex-col items-center mb-[1rem] gap-[1rem] flex-1">
          <LabelInput value={selectDay} onChange={handleDateChange} />
          <VerticalTimeLine date={selectDay} />
        </div>
      </main>
      <Nav />
    </div>
  );
};
export default ChartPage;
