import { PulseLoader } from "react-spinners";
import ReactButton from "../../components/main/detection/ReactButton";
import {
  DETECTION,
  DETECTION_INFO,
  LOADING_INFO,
} from "../../constants/detection";
import { useEffect } from "react";
import { useDetectionStore } from "../../stores/detection";
import { useNavigate } from "react-router";

const DetectionPage = () => {
  const navigate = useNavigate();
  const isBabyCry = useDetectionStore((state: any) => state.isBabyCry);
  const cryingType = useDetectionStore((state: any) => state.cryingType);

  useEffect(() => {
    if (cryingType !== 0) {
      navigate("/detection/result");
    }
  }, [cryingType]);

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <p className="text-gray-1 text-sm ">
        {isBabyCry ? LOADING_INFO : DETECTION_INFO}
      </p>
      <ReactButton
        icon={isBabyCry ? DETECTION.LOADING.ICON : DETECTION.NORMAL.ICON}
        color={isBabyCry ? DETECTION.LOADING.COLOR : DETECTION.NORMAL.COLOR}
      />
      {isBabyCry ? (
        <PulseLoader color="#c8c8c8" />
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-0 text-xl">
          <p>아기가</p>
          <p>
            <span className="text-white">{DETECTION.NORMAL.MESSAGE}</span>
            상태에요
          </p>
        </div>
      )}
    </div>
  );
};

export default DetectionPage;
