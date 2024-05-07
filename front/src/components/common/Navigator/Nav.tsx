import { useNavigate } from "react-router-dom";
import setting from "../../../assets/svgs/nav/setting.svg";
import voice from "../../../assets/svgs/nav/detection.svg";
import diary from "../../../assets/svgs/nav/diary.svg";
import chat from "../../../assets/svgs/nav/chat.svg";
import heart from "../../../assets/svgs/nav/heart.svg";

interface NavItemProps {
  text: string;
  icon: string;
  path: string;
}

const NavItem = ({
  text,
  icon,
  path,
}: {
  text: string;
  icon: string;
  path: string;
}) => {
  const navigate = useNavigate();

  const handleNavItemClick = () => {
    navigate(path);
  };

  return (
    <div
      onClick={handleNavItemClick}
      className="flex flex-col justify-center items-center gap-1 w-[3rem]"
    >
      <img src={icon} alt="" />
      <span className="text-xs text-gray-0">{text}</span>
    </div>
  );
};

const Nav = () => {
  const navList: NavItemProps[] = [
    { text: "성장일지", icon: diary, path: "/record" },
    { text: "보이스", icon: voice, path: "/voice" },
    { text: "울음감지", icon: heart, path: "/detection" },
    { text: "챗봇", icon: chat, path: "/chat" },
    { text: "설정", icon: setting, path: "/setting" },
  ];

  return (
    <nav className="bg-white w-full h-[3.3125rem] flex justify-around items-center px-4 shadow-nav fixed bottom-0 left-0 z-10">
      {navList.map((item, index) => (
        <NavItem
          key={index}
          text={item.text}
          icon={item.icon}
          path={item.path}
        />
      ))}
    </nav>
  );
};

export default Nav;
