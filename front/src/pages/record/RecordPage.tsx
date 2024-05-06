import Nav from "../../components/common/Navigator/Nav";
import TodayChart from "../../components/main/record/TodayChart";
import TodayDiary from "../../components/main/record/TodayDiary";

const RecordPage = () => {
  return (
    <div className="flex flex-col items-center h-screen w-screen">
      <header className=" bg-white flex items-center justify-center text-primary h-[6rem] w-full text-2xl fixed">
        <p className="w-[80%]">성장일지</p>
      </header>
      <main className="flex flex-col items-center justify-center w-full mt-[6rem]">
        <TodayDiary />
        <TodayChart />
      </main>

      <Nav />
    </div>
  );
};

export default RecordPage;
