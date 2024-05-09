import Nav from "../../components/common/Navigator/Nav";
import StyledCalendar from "../../components/main/record/Calendar";

const DiaryDetailPage = () => {
  return (
    <div className="flex flex-col items-center h-screen w-screen">
      <header className="bg-white flex items-center text-primary h-[6rem] w-[80%] text-2xl fixed">
        성장 일지
      </header>
      <main className="flex flex-col items-center justify-center w-full  mt-[6rem]">
        <StyledCalendar />
      </main>
      <Nav />
      <div></div>
    </div>
  );
};

export default DiaryDetailPage;
