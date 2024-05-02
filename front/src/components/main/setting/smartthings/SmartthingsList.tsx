import { useNavigate } from "react-router-dom";
import { SMARTTHINGS } from "../../../../constants/smartthings";

const SmartthingsList = () => {
  const navigate = useNavigate();
  const handleRoutine = (type: string) => () => {
    return navigate("/setting/things/routine", { state: { type } });
  };

  return (
    <div className="flex flex-wrap w-full justify-center items-center gap-[1.2rem] h-[30rem] overflow-y-auto no-scrollbar">
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
          <div className="flex flex-col justify-center items-start">
            <div className="text-white">등록 자동화</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SmartthingsList;
