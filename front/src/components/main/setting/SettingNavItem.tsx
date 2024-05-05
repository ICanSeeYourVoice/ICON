import { useNavigate } from "react-router-dom";
import rightArrow from "../../../assets/svgs/setting/rightArrow.svg";

const SettingNavItem = ({ text, path }: { text: string; path: string }) => {
  const navigate = useNavigate();

  const handleSettingNavItemClick = () => {
    navigate(path);
  };

  return (
    <button
      onClick={handleSettingNavItemClick}
      className="flex justify-center items-center w-full h-[4.125rem]"
    >
      <div className="flex justify-between items-center w-[15.25rem] ">
        <p>{text}</p>
        <img src={rightArrow} alt="" />
      </div>
    </button>
  );
};

export default SettingNavItem;
