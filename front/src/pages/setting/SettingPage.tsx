import SettingNavItem from "../../components/main/setting/SettingNavItem";

interface SettingNavItemProps {
  text: string;
  path: string;
}

const SettingPage = () => {
  const settingNavList: SettingNavItemProps[] = [
    { text: "계정", path: "/" },
    { text: "알림 계정 등록", path: "/" },
    { text: "SmartThings", path: "/" },
  ];

  return (
    <>
      {settingNavList.map((item, index) => (
        <SettingNavItem key={index} text={item.text} path={item.path} />
      ))}
    </>
  );
};

export default SettingPage;
