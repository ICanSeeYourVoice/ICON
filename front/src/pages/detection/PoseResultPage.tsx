import ReactButton from "../../components/main/detection/ReactButton";
import InfoMessage from "../../components/main/detection/InfoMessage";
import { RESTART_INFO } from "../../constants/detection";
import noface from "../../assets/svgs/detection/noface.svg";

const PoseResultPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <p className="text-gray-1 text-sm">{RESTART_INFO}</p>
      <ReactButton icon={noface} color="#FFFFFF" />
      <div className="flex flex-col items-center justify-center text-gray-0 text-xl">
        <p>아기가</p>
        <p>
          <span className="text-white">위험한 자세를 </span>
          하고 있어요
        </p>
      </div>
      <InfoMessage text="아기를 보살펴주세요" />
    </div>
  );
};

export default PoseResultPage;
