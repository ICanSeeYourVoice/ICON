import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoughnutChart from "./chart/DoughnutChart";

const TodayChart = () => {
  const navigate = useNavigate();
  const handleChartDetail = () => {
    navigate("/record/chart", { state: { date } });
  };
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month =
      today.getMonth() + 1 >= 10
        ? today.getMonth() + 1
        : "0" + (today.getMonth() + 1);
    const day = today.getDate() >= 10 ? today.getDate() : "0" + today.getDate();

    setDate(year + "-" + month + "-" + day);
  }, [date]);

  return (
    <div>
      <div className="flex justify-between pt-[3rem] w-[14.5rem] text-slate-500 text-xs pb-[0.5rem]">
        <div>울음 통계</div>

        <div onClick={handleChartDetail}>+더보기</div>
      </div>

      <div className="w-full flex justify-center">
        <div className="flex justify-center">
          <DoughnutChart date={date} />
        </div>
      </div>
    </div>
  );
};

export default TodayChart;
