import SmilePhotoLg from "../../components/main/record/SmilePhotoLg";
import SmilePhotoSm from "../../components/main/record/SmilePhotoSm";
import Nav from "../../components/common/Navigator/Nav";
import { Link } from "react-router-dom";

const RecordPage = () => {
  return (
    <div className="flex flex-col items-center h-screen w-screen pt-[3.125rem] pb-[10.3125rem] ">
      <header className="text-primary w-[15.25rem] text-2xl">성장일지</header>
      <div className="flex justify-between pt-[4rem] w-[15rem] text-slate-500 text-sm pb-[0.5rem]">
        <div>일지</div>
        <div>+더보기</div>
      </div>
      <div className="w-full flex justify-center">
        <div className="flex justify-center gap-4 max-w-screen-lg">
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
      <Nav />
    </div>
  );
};

export default RecordPage;
