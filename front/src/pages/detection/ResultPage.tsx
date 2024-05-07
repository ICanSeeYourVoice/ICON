import ReactButton from "../../components/main/detection/ReactButton";
import { DETECTION, RESTART_INFO } from "../../constants/detection";
import InfoMessage from "../../components/main/detection/InfoMessage";
import { useDetectionStore } from "../../stores/detection";

const ResultPage = () => {
  const cryingType = useDetectionStore((state: any) => state.cryingType);

  const getCryInfo = (cryReason: string) => {
    switch (cryReason) {
      case "DISCOMFORT":
        return DETECTION.DISCOMFORT;
      case "HUNGRY":
        return DETECTION.HUNGRY;
      case "PAIN":
        return DETECTION.PAIN;
      case "TIRED":
        return DETECTION.TIRED;
      case "BURPING":
        return DETECTION.BURPING;
      default:
        return DETECTION.TIRED;
    }
  };

  const {
    ICON: icon,
    COLOR: color,
    MESSAGE: message,
    SOLUTION: solution,
  } = getCryInfo(cryingType);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <p className="text-gray-1 text-sm">{RESTART_INFO}</p>
      <ReactButton icon={icon} color={color} />
      <div className="flex flex-col items-center justify-center text-gray-0 text-xl">
        <p>아기가</p>
        <p>
          <span className="text-white">{message}</span>
          울고있어요
        </p>
      </div>
      <InfoMessage text={solution} />
    </div>
  );
};

export default ResultPage;
