import SettingNavItem from "../../components/main/setting/SettingNavItem";

interface SettingNavItemProps {
  text: string;
  path: string;
}

const SettingPage = () => {
  const settingNavList: SettingNavItemProps[] = [
    { text: "계정", path: "/setting/account" },
    { text: "알림 계정 등록", path: "/setting/share" },
    { text: "SmartThings", path: "/setting/things" },
  ];

  return (
    <>
      {settingNavList.map((item, index) => (
        <SettingNavItem key={index} text={item.text} path={item.path} />
      ))}
      <button className="flex justify-center items-center w-full h-[3.5rem]">
        <div className="flex justify-between items-center w-[80%] ">
          <p className="text-red-0">로그아웃</p>
        </div>
      </button>
    </>
  );
};

export default SettingPage;
