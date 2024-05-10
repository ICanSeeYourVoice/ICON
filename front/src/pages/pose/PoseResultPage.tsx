import ReactButton from "../../components/main/detection/ReactButton";
import { DETECTION_POSE, RESTART_INFO } from "../../constants/detectionPose";
import InfoMessage from "../../components/main/detection/InfoMessage";

const PoseResultPage = () => {

  const getIsBabyFace = () => { 
    return DETECTION_POSE.NOFACE;
  };

  const {
    ICON: icon,
    COLOR: color,
    MESSAGE: message,
    SOLUTION: solution,
  } = getIsBabyFace();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <p className="text-gray-1 text-sm">{RESTART_INFO}</p>
      <ReactButton icon={icon} color={color} />
      <div className="flex flex-col items-center justify-center text-gray-0 text-xl">
        <p>아기가</p>
        <p>
          <span className="text-white">{message}</span>
           하고 있어요
        </p>
      </div>
      <InfoMessage text={solution}/>
    </div>
  );
};

export default PoseResultPage;
