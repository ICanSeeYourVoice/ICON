import { useLocation, useNavigate } from "react-router-dom";
import setting from "../../../assets/svgs/nav/setting.svg";
import voice from "../../../assets/svgs/nav/voice.svg";
import diary from "../../../assets/svgs/nav/diary.svg";
import chat from "../../../assets/svgs/nav/chat.svg";
import heart from "../../../assets/svgs/nav/heart.svg";
import settingClicked from "../../../assets/svgs/nav/settingClicked.svg";
import diaryClicked from "../../../assets/svgs/nav/diaryClicked.svg";
import voiceClicked from "../../../assets/svgs/nav/voiceClicked.svg";
import heartClicked from "../../../assets/svgs/nav/heartClicked.svg";
import chatClicked from "../../../assets/svgs/nav/chatClicked.svg";
import { useEffect } from "react";
import { useNavStore } from "../../../stores/nav";

interface NavItemProps {
  text: string;
  icon: string;
  clickedIcon: string;
  path: string;
  index: number;
}

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selected = useNavStore((state) => state.selected);
  const setSelected = useNavStore((state) => state.setSelected);

  const navList: NavItemProps[] = [
    {
      text: "성장일지",
      icon: diary,
      clickedIcon: diaryClicked,
      path: "/record",
      index: 0,
    },
    {
      text: "보이스",
      icon: voice,
      clickedIcon: voiceClicked,
      path: "/voice",
      index: 1,
    },
    {
      text: "울음감지",
      icon: heart,
      clickedIcon: heartClicked,
      path: "/detection",
      index: 2,
    },
    {
      text: "챗봇",
      icon: chat,
      clickedIcon: chatClicked,
      path: "/chat",
      index: 3,
    },
    {
      text: "설정",
      icon: setting,
      clickedIcon: settingClicked,
      path: "/setting",
      index: 4,
    },
  ];

  useEffect(() => {
    const selectedItem = navList.find((item) =>
      location.pathname.startsWith(item.path)
    );
    if (selectedItem) {
      setSelected(selectedItem.index);
    }
  }, [location.pathname]);

  const handleNavItemClick = (path: string, index: number) => {
    navigate(path);
    setSelected(index);
  };

  return (
    <nav className="bg-white w-full h-[3.3125rem] flex justify-around items-center px-4 shadow-nav fixed bottom-0 left-0 z-7">
      {navList.map((item) => (
        <button
          key={item.index}
          onClick={() => handleNavItemClick(item.path, item.index)}
          className="flex flex-col justify-center items-center gap-1 w-[3rem]"
        >
          <img
            src={selected === item.index ? item.clickedIcon : item.icon}
            alt=""
          />
          <span
            className={`text-xs ${
              selected === item.index ? "text-primary" : "text-gray-0"
            }`}
          >
            {item.text}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default Nav;
