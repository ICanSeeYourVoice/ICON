import SmartthingsList from "../../../components/main/setting/smartthings/SmartthingsList";

const SettingThingsPage = () => {
  return (
    <div className="flex flex-col text-gray-1 text-[1rem] w-[15.25rem] justify-center items-center gap-[1.2rem]">
      <p>상태에 따른 알림을 설정 해보세요</p>
      <SmartthingsList />
    </div>
  );
};

export default SettingThingsPage;
