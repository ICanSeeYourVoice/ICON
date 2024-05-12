import { useQuery } from "@tanstack/react-query";
import { GetStatusRoutine } from "../../../apis/SmartThings";
import { PulseLoader } from "react-spinners";
import Nav from "../../../components/common/Navigator/Nav";
import TopBar from "../../../components/common/Navigator/TopBar";
import RegisterSmartThingsPage from "./RegisterSmartThingsPage";
import SettingThingsPage from "./SettingThingsPage";
interface RoutineItem {
  scene_id: string;
  name: string;
  trigger?: string;
}
const SmartThingsPage = () => {
  const { data: getRoutineData, isLoading: isLoadingGetRoutine } = useQuery<
    RoutineItem[]
  >({ queryFn: GetStatusRoutine, queryKey: ["getRoutineData"], retry: 1 });

  return (
    <div className="flex flex-col items-center h-screen w-screen">
      <TopBar text="SmartThings" path="setting" />
      <main className="flex flex-col justify-center items-center w-[80%] h-full mt-[6rem]">
        {isLoadingGetRoutine ? (
          <div className="flex items-center justify-center w-full h-full">
            <PulseLoader color="#c8c8c8" />
          </div>
        ) : !getRoutineData ? (
          <RegisterSmartThingsPage />
        ) : (
          <div className="flex h-full">
            <SettingThingsPage routineData={getRoutineData} />
          </div>
        )}
      </main>
      <Nav />
    </div>
  );
};

export default SmartThingsPage;
