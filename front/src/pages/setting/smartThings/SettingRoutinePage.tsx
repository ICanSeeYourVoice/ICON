import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CheckRoutine,
  GetStatusRoutine,
  RegisterRoutine,
} from "../../../apis/SmartThings";
import { PulseLoader } from "react-spinners";
import Nav from "../../../components/common/Navigator/Nav";
import TopBar from "../../../components/common/Navigator/TopBar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../../../components/common/button/PostButton";
import { SMARTTHINGS } from "../../../constants/smartthings";

interface RoutineItem {
  scene_id: string;
  name: string;
  trigger?: string;
}

const SettingRoutinePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type } = location.state || {};
  const [selectedSceneId, setSelectedSceneId] = useState("");

  const { data: checkRoutineData, isLoading: isLoadingCheckRoutine } = useQuery<
    RoutineItem[]
  >({ queryFn: CheckRoutine, queryKey: ["checkRoutineData"] });
  const { data: getStatusRoutineData, isLoading: isLoadingGetStatusRoutine } =
    useQuery({ queryFn: GetStatusRoutine, queryKey: ["getStatusRoutineData"] });

  const findRoutineNameByTrigger = (trigger: string) => {
    if (getStatusRoutineData) {
      const foundRoutine = getStatusRoutineData.find(
        (routine: RoutineItem) => routine.trigger === trigger
      );
      return foundRoutine ? foundRoutine.scene_id : "";
    }
  };

  useEffect(() => {
    setSelectedSceneId(findRoutineNameByTrigger(type));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkRoutineData, getStatusRoutineData, type]);

  const handleRoutineClick: React.MouseEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    setSelectedSceneId((checked) =>
      checked == target.value ? "" : target.value
    );
  };

  const handleRegisterRoutine = () => {
    mutate({ scene_id: selectedSceneId, trigger: type });
  };

  const { mutate } = useMutation({
    mutationFn: RegisterRoutine,
    onSuccess: (res) => {
      console.log("루틴 등록 성공", res);
      toast.success("자동화 등록에 성공했어요.", { duration: 800 });
      navigate("/setting/things");
    },
    onError: (error) => {
      console.log("루틴 등록 실패", error);
      toast.error("자동화 등록에 실패했어요.", { duration: 800 });
    },
  });

  return (
    <div className="flex flex-col items-center h-screen w-screen">
      <TopBar text="SmartThings" path="setting/things" />
      <main className="flex flex-col justify-center items-center w-[80%] gap-[1rem] mt-[6rem]">
        {isLoadingCheckRoutine || isLoadingGetStatusRoutine ? (
          <div className="flex items-center justify-center w-full h-full">
            <PulseLoader color="#c8c8c8" />
          </div>
        ) : (
          <>
            <header className="text-primary align-bottom w-full text-2xl">
              {SMARTTHINGS[type].LABEL}
            </header>
            {!checkRoutineData ? (
              <div className="flex items-center justify-items-center justify-center w-full h-full">
                자동화 목록이 없어요😢
                <br />
                SmartThings App에서 자동화를 추가해주세요.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 w-full justify-center justify-items-center items-center content-start h-[60vh] overflow-y-auto">
                {checkRoutineData.map((item: RoutineItem) => (
                  <div
                    key={item.scene_id}
                    className={`p-4 w-full h-full text-center rounded-lg whitespace-pre-line ${
                      selectedSceneId == item.scene_id
                        ? "bg-primary text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    <label>
                      <input
                        className="hidden"
                        type="radio"
                        value={item.scene_id}
                        checked={selectedSceneId == item.scene_id}
                        onClick={handleRoutineClick}
                        onChange={() => {}}
                      />
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            )}
            {checkRoutineData && (
              <Button label="등록" onClick={handleRegisterRoutine} />
            )}
          </>
        )}
      </main>
      <Nav />
    </div>
  );
};

export default SettingRoutinePage;
