import { useNavigate } from "react-router-dom";
import { SMARTTHINGS } from "../../../../constants/smartthings";

interface RoutineItem {
  scene_id: string;
  name: string;
  trigger?: string;
}

interface ListDataProps {
  routineData: RoutineItem[];
}

const SmartthingsList: React.FC<ListDataProps> = ({ routineData }) => {
  const navigate = useNavigate();
  const handleRoutine = (type: string) => () => {
    return navigate("/setting/things/routine", { state: { type } });
  };

  const findRoutineNameByTrigger = (trigger: string) => {
    const foundRoutine = routineData.find(
      (routine) => routine.trigger === trigger
    );
    return foundRoutine ? foundRoutine.name : "설정하기";
  };

  return (
    <div className="flex flex-wrap w-full justify-center items-center gap-[0.5rem] h-[70vh] overflow-y-auto">
      {Object.entries(SMARTTHINGS).map(([key, value], idx) => (
        <div
          key={idx}
          className="flex flex-row justify-between w-full p-[1rem] rounded-[0.625rem] h-[5rem]"
          style={{ backgroundColor: value.COLOR }}
          onClick={handleRoutine(key)}
        >
          <div className="flex flex-col justify-center items-center">
            <img src={value.ICON} alt={value.LABEL} className="w-8 h-8" />
            <div className="mt-[0.2rem] text-black">{value.LABEL}</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="text-black">{findRoutineNameByTrigger(key)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SmartthingsList;
