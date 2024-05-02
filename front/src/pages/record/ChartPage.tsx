import { useState } from "react";
import { useLocation } from "react-router-dom";
import LabelInput from "../../components/common/Input/DateInput";
import TopBar from "../../components/common/Navigator/TopBar";
import Nav from "../../components/common/Navigator/Nav";
import MultiaxisLineChart from "../../components/main/record/chart/MultiaxisLineChart";
import VerticalTimeLine from "../../components/main/record/timeline/VerticalTimeLine";

const ChartPage = () => {
  const location = useLocation();
  const { date } = location.state || {};
  const [selectDay, setSelectDay] = useState(date || "");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectDay(e.target.value);
  };

  return (
    <div className="flex flex-col items-center h-screen w-screen pt-[3.125rem] pb-[10.3125rem] gap-[1.5rem] ">
      <TopBar text="통계" path="record" />
      <main className="flex flex-col items-center justify-center w-full">
        <LabelInput value={selectDay} onChange={handleDateChange} />
        <div className="w-[15rem] h-[13rem] mt-[1rem]">
          <MultiaxisLineChart date={selectDay} />
        </div>
        <VerticalTimeLine date={selectDay} />
      </main>
      <Nav />
    </div>
  );
};
export default ChartPage;
