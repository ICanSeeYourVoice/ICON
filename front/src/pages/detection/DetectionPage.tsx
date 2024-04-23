import ReactButton from "../../components/main/detection/ReactButton";
import { DETECTION, DETECTION_INFO } from "../../constants/detection";

const DetectionPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <p className="text-gray-1 text-sm ">{DETECTION_INFO}</p>
      <ReactButton
        icon={DETECTION.NORMAL.ICON}
        color={DETECTION.NORMAL.COLOR}
      />
      <div className="flex flex-col items-center justify-center text-gray-0 text-2xl">
        <p>아기가</p>
        <p>
          <span className="text-white">{DETECTION.NORMAL.MESSAGE}</span>
          상태에요
        </p>
      </div>
    </div>
  );
};

export default DetectionPage;
