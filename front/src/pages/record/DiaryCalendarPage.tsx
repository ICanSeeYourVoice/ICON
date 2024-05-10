import Nav from "../../components/common/Navigator/Nav";
import DiaryCalendar from "../../components/main/record/DiaryCalendar";

const DiaryCalendarPage = () => {
  return (
    <div className="flex flex-col items-center h-screen w-screen">
      <header className="bg-white flex items-center text-primary h-[6rem] w-[80%] text-2xl fixed">
        성장 일지
      </header>
      <main className="flex flex-col items-center justify-center w-full  mt-[6rem]">
        <DiaryCalendar />
      </main>
      <Nav />
      <div></div>
    </div>
  );
};

export default DiaryCalendarPage;
