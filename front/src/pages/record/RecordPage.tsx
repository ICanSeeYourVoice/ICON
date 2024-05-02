import Nav from "../../components/common/Navigator/Nav";
import TodayChart from "../../components/main/record/TodayChart";
import TodayDiary from "../../components/main/record/TodayDiary";

const RecordPage = () => {
  return (
    <div className="flex flex-col items-center h-screen w-screen pt-[3.125rem] ">
      <header className="text-primary w-[15.25rem] text-2xl">성장일지</header>
      <TodayDiary />
      <TodayChart />
      <Nav />
    </div>
  );
};

export default RecordPage;
