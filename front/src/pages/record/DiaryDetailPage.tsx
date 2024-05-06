import TopBar from "../../components/common/Navigator/TopBar";
import Nav from "../../components/common/Navigator/Nav";
import MoveButton from "../../components/common/button/MoveButton";
import StyledCalendar from "../../components/main/record/Calendar";

const DiaryDetailPage = () => {
  return (
    <div className="flex flex-col items-center h-screen w-screen pt-[3.125rem] pb-[10.3125rem] gap-[1.5rem]">
      <TopBar text=" 일지" />
      <main className="flex flex-col items-center justify-center w-full gap-[1.5rem]">
        <StyledCalendar />
        <div className="fixed bottom-[5rem] ">
          <MoveButton path="/record/diary/register" text="일지 추가하기" />
        </div>
      </main>
      <Nav />
      <div></div>
    </div>
  );
};

export default DiaryDetailPage;
