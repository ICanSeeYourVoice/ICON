import { useNavigate } from "react-router";
import "./ReactButton.css";
import { useDetectionStore } from "../../../stores/detection";

const ReactButton = ({ icon, color }: { icon: string; color: string }) => {
  const navigate = useNavigate();
  // const isBabyCry = useDetectionStore((state: any) => state.isBabyCry);
  const setIsBabyCry = useDetectionStore((state: any) => state.setIsBabyCry);

  // const cryingType = useDetectionStore((state: any) => state.cryingType);
  const setCryingType = useDetectionStore((state: any) => state.setCryingType);

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
          setCryingType(0);
          setIsBabyCry(false);
          navigate("/detection");
        }}
        className="flex justify-center items-center w-[35%] aspect-square rounded-full absolute"
        style={{ backgroundColor: color }}
      >
        <img src={icon} alt="" />
      </button>
    </div>
  );
};

export default ReactButton;
