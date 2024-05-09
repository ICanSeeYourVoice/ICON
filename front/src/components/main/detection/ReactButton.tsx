import { useNavigate } from "react-router";
import "./ReactButton.css";
import { useDetectionStore } from "../../../stores/detection";
import { useDetectionPoseStore } from "../../../stores/detectionPose";

const ReactButton = ({ icon, color }: { icon: string; color: string }) => {
  const navigate = useNavigate();
  // const isBabyCry = useDetectionStore((state: any) => state.isBabyCry);
  const setIsBabyCry = useDetectionStore((state: any) => state.setIsBabyCry);

  // const cryingType = useDetectionStore((state: any) => state.cryingType);
  const setCryingType = useDetectionStore((state: any) => state.setCryingType);

  const setIsBabyFace = useDetectionPoseStore(
    (state: any) => state.setIsBabyFace
  );
  const isBabyFace = useDetectionPoseStore((state: any) => state.isBabyFace);

  return (
    <div className="circle-container">
      <div
        style={{ backgroundColor: `${color}33` }}
        className="circle"
        id="circle1"
      >
        <div
          style={{ backgroundColor: `${color}33` }}
          className="circle"
          id="circle2"
        >
          <div
            style={{ backgroundColor: `${color}33` }}
            className="circle"
            id="circle3"
          ></div>
        </div>
      </div>
      <button
        onClick={() => {
          if (!isBabyFace) {
            setIsBabyFace(true);
            navigate("/pose");
          } else {
            setCryingType(0);
            setIsBabyCry(false);
            navigate("/detection");
          }
        }}
        className="flex justify-center items-center w-[35%] aspect-square rounded-full absolute max-w-[7.5rem] max-h-[7.5rem]"
        style={{ backgroundColor: color }}
      >
        <img src={icon} alt="" />
      </button>
    </div>
  );
};

export default ReactButton;
