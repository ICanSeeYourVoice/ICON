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

interface RoutineItem {
  scene_id: string;
  name: string;
  trigger?: string;
  istype?: boolean;
}

const SettingRoutinePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type } = location.state || {};
  const [isLodding, setIsLodding] = useState(true);
  const [routineList, setRoutineList] = useState<RoutineItem[]>([]);
  const [selectedSceneId, setSelectedSceneId] = useState("");

  const { data: checkRoutineData, isLoading: isLoadingCheckRoutine } = useQuery<
    RoutineItem[]
  >({ queryFn: CheckRoutine, queryKey: ["checkRoutineData"] });
  const { data: getStatusRoutineData, isLoading: isLoadingGetStatusRoutine } =
    useQuery({ queryFn: GetStatusRoutine, queryKey: ["getStatusRoutineData"] });

  useEffect(() => {
    if (!isLoadingCheckRoutine && !isLoadingGetStatusRoutine) {
      setIsLodding(false);
    }

    if (checkRoutineData && getStatusRoutineData) {
      const typeItems = getStatusRoutineData.filter(
        (item: RoutineItem) => item.trigger === type
      );

      const data = checkRoutineData.map((checkItem: RoutineItem) => {
        const istype = typeItems.some(
          (typeItem: RoutineItem) => typeItem.scene_id === checkItem.scene_id
        );
        return { ...checkItem, istype };
      });

      setRoutineList(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkRoutineData, getStatusRoutineData]);

  const handleItemClick = (scene_id: string) => {
    setSelectedSceneId(scene_id);
    setRoutineList((data) =>
      data.map((item) =>
        item.scene_id === scene_id ? { ...item, istype: true } : item
      )
    );
  };

  const handleRegisterRoutine = () => {
    if (selectedSceneId !== "") {
      console.log(selectedSceneId, type);
      mutate({ scene_id: selectedSceneId, trigger: type });
    } else {
      toast.error("등록할 자동화를 선택해주세요.", { duration: 800 });
    }
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
      <main className="flex flex-col items-center justify-center w-full flex-1">
        {isLodding ? (
          <div className="flex items-center justify-center w-full h-full">
            <PulseLoader color="#c8c8c8" />
          </div>
        ) : (
          <div>
            <header className="text-primary w-[15.25rem] text-2xl">
              {type}
            </header>
            {routineList.map((item: RoutineItem) => (
              <div
                key={item.scene_id}
                className={`p-4 m-2 rounded-lg ${
                  item.istype ? "bg-red-200" : "bg-gray-200"
                }`}
                onClick={() => handleItemClick(item.scene_id)}
              >
                {item.name}
              </div>
            ))}
            <Button label="등록" onClick={handleRegisterRoutine} />
          </div>
        )}
      </main>
      <Nav />
    </div>
  );
};

export default SettingRoutinePage;
