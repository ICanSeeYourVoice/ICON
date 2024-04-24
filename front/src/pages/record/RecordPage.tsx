import SmilePhotoLg from "../../components/main/record/SmilePhotoLg";
import SmilePhotoSm from "../../components/main/record/SmilePhotoSm";
import Nav from "../../components/common/Navigator/Nav";
import DiaryThumbnail from "../../components/main/record/DiaryThumbnail";

const RecordPage = () => {
  return (
    <div className="flex flex-col items-center h-screen w-screen pt-[3.125rem] pb-[10.3125rem] ">
      <header className="text-primary w-[15.25rem] text-2xl">성장일지</header>
      <div className="flex justify-between pt-[2rem] w-[14.5rem] text-slate-500 text-xs pb-[0.5rem]">
        <div>일지</div>
        <div>+더보기</div>
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
      <div className="w-full flex justify-center pt-[1rem] ">
        <DiaryThumbnail />
      </div>
      <Nav />
    </div>
  );
};

export default RecordPage;
