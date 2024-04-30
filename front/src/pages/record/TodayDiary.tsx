import SmilePhotoLg from "../../components/main/record/SmilePhotoLg";
import SmilePhotoSm from "../../components/main/record/SmilePhotoSm";
import Nav from "../../components/common/Navigator/Nav";
import DiaryThumbnail from "../../components/main/record/DiaryThumbnail";
import { useNavigate } from "react-router-dom";

const TodayDiary = () => {
  const navigate = useNavigate();
  const handleDiaryDetail = () => {
    navigate("/record/detail/diary");
  };

  return (
    <div>
      <div className="flex justify-between pt-[2rem] w-[14.5rem] text-slate-500 text-xs pb-[0.5rem]">
        <div>일지</div>

        <div onClick={handleDiaryDetail}>+더보기</div>
      </div>
      <div className="w-full flex justify-center">
        <div className="flex justify-center gap-3 max-w-screen-lg">
          <div className="flex justify-center items-start flex-1">
            <div className="self-end "></div>
            <SmilePhotoLg />
          </div>
          <div className="flex flex-col justify-start items-center flex-1 gap-2">
            <SmilePhotoSm />
            <SmilePhotoSm />
          </div>
        </div>
      </div>
      <div
        onClick={handleDiaryDetail}
        className="w-full flex justify-center pt-[1rem] "
      >
        <DiaryThumbnail
          title="3월 05일에 있었던 우리 아가의 첫 웃음은 하루종일 생각나"
          content="날이 좋아서 그런지 아기가 빨리 성장해서 같이 나들이 가고싶어"
        />
      </div>
      <Nav />
    </div>
  );
};

export default TodayDiary;
