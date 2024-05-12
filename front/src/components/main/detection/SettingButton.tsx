import { useState } from "react";
import setting from "../../../assets/svgs/detection/setting.svg";

const SettingButton = () => {
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center items-end absolute top-0 right-0 mt-[1.8rem] mr-[2rem] gap-3">
      <div
        className="flex items-center justify-center w-[2.5rem] h-[2.5rem] bg-white bg-opacity-15 rounded-full cursor-pointer"
        onClick={() => setIsSettingOpen(!isSettingOpen)}
      >
        <img src={setting} alt="" />
      </div>
      <div
        className={`transition-all duration-400 ${
          isSettingOpen ? "opacity-100" : "opacity-0"
        } ${isSettingOpen ? "translate-y-0" : "translate-y-[-0.5rem]"}`}
      >
        {isSettingOpen && (
          <div className="flex flex-col justify-center items-end gap-3">
            <div className="flex flex-row gap-2 text-sm items-center justify-center">
              <div>
                <span className="text-white ">카메라</span>
              </div>
              <div className="flex items-center justify-center w-[2rem] h-[2rem] bg-white bg-opacity-15 rounded-full">
                <span className="text-xs font-bold">OFF</span>
              </div>
            </div>

            <div className="flex flex-row gap-2 text-sm items-center justify-center">
              <div>
                <span className="text-white ">울음</span>
              </div>
              <div className="flex items-center justify-center w-[2rem] h-[2rem] bg-white bg-opacity-15 rounded-full">
                <span className="text-xs font-bold">ON</span>
              </div>
            </div>

            <div className="flex flex-row gap-2 text-sm items-center justify-center">
              <div>
                <span className="text-white">행동</span>
              </div>
              <div className="flex items-center justify-center w-[2rem] h-[2rem] bg-white bg-opacity-15 rounded-full">
                <span className="text-xs font-bold">OFF</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingButton;
