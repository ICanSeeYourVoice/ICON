import Nav from "../../components/common/Navigator/Nav";
import TodayDiary from "./TodayDiary";

const RecordPage = () => {
  return (
    <div className="flex flex-col items-center h-screen w-screen pt-[3.125rem] pb-[10.3125rem] ">
      <header className="text-primary w-[15.25rem] text-2xl">성장일지</header>
      <TodayDiary />
      <Nav />
    </div>
  );
};

export default RecordPage;
