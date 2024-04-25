import TopBar from "../../components/common/Navigator/TopBar";
import DateInput from "../../components/common/Input/DateInput";
import DiaryAll from "../../components/main/record/DiaryAll";
import AllSmilePhoto from "../../components/main/record/AllSmilePhoto";
import Nav from "../../components/common/Navigator/Nav";
import ColorButton from "../../components/common/button/ColorButton";

const DiaryDetailPage = () => {
  return (
    <div className="flex flex-col items-center h-screen w-screen pt-[3.125rem] pb-[10.3125rem] gap-[1.5rem]">
      <TopBar text=" 일지" />
      <DateInput />
      <DiaryAll title="제목" content="내용" />
      <AllSmilePhoto />
      <Nav />
      <ColorButton path="/record/diary/register" label="일지 추가하기" />
    </div>
  );
};

export default DiaryDetailPage;
