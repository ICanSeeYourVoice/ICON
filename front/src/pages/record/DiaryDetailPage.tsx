import Topbar from "../../components/common/Navigator/Topbar";
import DateInput from "../../components/common/Input/DateInput";
import DiaryAll from "../../components/main/record/DiaryAll";
import AllSmilePhoto from "../../components/main/record/AllSmilePhoto";
import Nav from "../../components/common/Navigator/Nav";
import ColorButton from "../../components/common/button/ColorButton";

const DiaryDetailPage = () => {
  return (
    <div className="flex flex-col items-center h-screen w-screen pt-[6rem] gap-[0.8rem]">
      <Topbar text=" 일지" />
      <DateInput />
      <DiaryAll title="제목" content="내용" />
      <AllSmilePhoto />
      <Nav />
      <ColorButton path="/record/diary/register" label="일지 추가하기" />
    </div>
  );
};

export default DiaryDetailPage;
