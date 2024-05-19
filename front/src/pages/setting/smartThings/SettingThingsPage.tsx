import SmartthingsList from "../../../components/main/setting/smartthings/SmartthingsList";

const SettingThingsPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full text-gray-1 text-[1rem] items-center gap-[1.2rem]">
      <p>상태에 따른 알림을 설정 해보세요</p>
      <SmartthingsList />
    </div>
  );
};

export default SettingThingsPage;
