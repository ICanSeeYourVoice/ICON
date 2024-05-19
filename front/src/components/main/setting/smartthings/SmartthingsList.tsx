import { useNavigate } from "react-router-dom";
import { SMARTTHINGS } from "../../../../constants/smartthings";

const SmartthingsList: React.FC = () => {
  const navigate = useNavigate();
  const handleRoutine = (type: string) => () => {
    return navigate("/setting/things/routine", { state: { type } });
  };

  return (
    <div className="grid grid-cols-2 gap-2 w-full justify-center justify-items-center items-center content-start h-[70vh] overflow-y-auto">
      {Object.entries(SMARTTHINGS).map(([key, value], idx) => (
        <div
          key={idx}
          className="flex w-full justify-center p-[1rem] rounded-[0.625rem] h-[8rem]"
          style={{ backgroundColor: value.COLOR }}
          onClick={handleRoutine(key)}
        >
          <div className="flex flex-col justify-center items-center">
            <img src={value.ICON} alt={value.LABEL} className="w-10 h-10" />
            <div className="mt-[0.2rem] text-black">{value.LABEL}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SmartthingsList;
