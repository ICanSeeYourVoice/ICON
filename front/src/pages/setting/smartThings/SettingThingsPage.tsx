import SmartthingsList from "../../../components/main/setting/smartthings/SmartthingsList";

interface RoutineItem {
  scene_id: string;
  name: string;
  trigger?: string;
}

interface ListDataProps {
  routineData: RoutineItem[];
}

const SettingThingsPage: React.FC<ListDataProps> = ({ routineData }) => {
  return (
    <div className="flex flex-col text-gray-1 text-[1rem] items-center gap-[1.2rem]">
      <p>상태에 따른 알림을 설정 해보세요</p>
      <SmartthingsList routineData={routineData} />
    </div>
  );
};

export default SettingThingsPage;
