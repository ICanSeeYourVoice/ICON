import ReactButton from "../../components/main/detection/ReactButton";
import { DETECTION, RESTART_INFO } from "../../constants/detection";
import InfoMessage from "../../components/main/detection/InfoMessage";

const ResultPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <p className="text-gray-1 text-sm ">{RESTART_INFO}</p>
      <ReactButton
        icon={DETECTION.SLEEPY.ICON}
        color={DETECTION.SLEEPY.COLOR}
      />

      <div className="flex flex-col items-center justify-center text-gray-0 text-xl">
        <p>아기가</p>
        <p>
          <span className="text-white">{DETECTION.SLEEPY.MESSAGE}</span>
          울고있어요
        </p>
      </div>
      <InfoMessage text={DETECTION.SLEEPY.SOLUTION} />
    </div>
  );
};

export default ResultPage;
