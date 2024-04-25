import TopBar from "../../components/common/Navigator/TopBar";
import DateInput from "../../components/common/Input/DateInput";
import DiaryAll from "../../components/main/record/DiaryAll";
import AllSmilePhoto from "../../components/main/record/AllSmilePhoto";
import Nav from "../../components/common/Navigator/Nav";
import MoveButton from "../../components/common/button/MoveButton";

const DiaryDetailPage = () => {
  return (
    <div className="flex flex-col items-center h-screen w-screen pt-[3.125rem] pb-[10.3125rem] gap-[1.5rem]">
      <TopBar text=" 일지" />
      <main className="flex flex-col items-center justify-center w-full gap-[1.5rem]">
        <DateInput />
        <DiaryAll title="제목" content="내용" />
        <AllSmilePhoto />
        <MoveButton path="/record/diary/register" text="일지 추가하기" />
      </main>
      <Nav />
      <div></div>
    </div>
  );
};

export default DiaryDetailPage;
