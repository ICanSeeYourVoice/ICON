import { useState } from "react";
import setting from "../../../assets/svgs/detection/setting.svg";
import video from "../../../assets/svgs/detection/video.svg";
import novideo from "../../../assets/svgs/detection/novideo.svg";
import { useDetectionStore, useToggle } from "../../../stores/detection";
import { useDetectionPoseStore } from "../../../stores/detectionPose";

const SettingButton = () => {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const cryingType = useDetectionStore((state: any) => state.cryingType);
  const isBabyFace = useDetectionPoseStore((state: any) => state.isBabyFace);

  const {
    isCryDetect,
    isFaceDetect,
    isCamera,
    setIsCryDetect,
    setIsFaceDetect,
    setIsCamera,
  } = useToggle();

  return (
    <div>
      <button
        className={`flex flex-col justify-center items-end absolute top-0 right-0 mt-[1.8rem] mr-[5.2rem] gap-3 ${
          isSettingOpen || cryingType !== 0 || !isBabyFace
            ? "opacity-40 pointer-events-none"
            : ""
        }`}
      >
        <div
          className="flex items-center justify-center w-[2.5rem] h-[2.5rem] bg-white bg-opacity-15 rounded-full cursor-pointer"
          onClick={() => {
            setIsCamera(!isCamera);
          }}
        >
          <img src={!isCamera ? novideo : video} alt="" />
        </div>
      </button>

      <button
        className={`flex flex-col justify-center items-end absolute top-0 right-0 mt-[1.8rem] mr-[2rem] gap-3 ${
          isCamera ? "opacity-40 pointer-events-none" : ""
        }`}
      >
        <div
          className="flex items-center justify-center w-[2.5rem] h-[2.5rem] bg-white bg-opacity-15 rounded-full cursor-pointer"
          onClick={() => {
            setIsSettingOpen(!isSettingOpen);
          }}
        >
          <img src={setting} alt="" />
        </div>
        <div
          className={`transition-all duration-400 ${
            isSettingOpen ? "opacity-100" : "opacity-0"
          } ${isSettingOpen ? "translate-y-0" : "translate-y-[-0.5rem]"}`}
        >
          {isSettingOpen && (
            <div className="flex flex-col justify-center items-end gap-2">
              <div className="flex flex-row gap-1 text-sm items-center justify-center pl-[0.7rem] pr-[0.7rem] pt-[0.2rem] pb-[0.2rem] bg-white rounded-[1.5rem]">
                <div>
                  <span className="text-black text-sm">울음</span>
                </div>
                <button
                  onClick={() => {
                    setIsCryDetect(!isCryDetect);
                  }}
                  className="flex items-center justify-center w-[1.8rem] h-[1.8rem] bg-black bg-opacity-15 rounded-full"
                >
                  <span className="text-xs font-bold">
                    {isCryDetect ? "ON" : "OFF"}
                  </span>
                </button>
              </div>

              <div className="flex flex-row gap-1 text-sm items-center justify-center pl-[0.7rem] pr-[0.7rem] pt-[0.2rem] pb-[0.2rem] bg-white rounded-[1.5rem]">
                <div>
                  <span className="text-black text-sm">행동</span>
                </div>
                <button
                  onClick={() => {
                    setIsFaceDetect(!isFaceDetect);
                  }}
                  className="flex items-center justify-center w-[1.8rem] h-[1.8rem] bg-black bg-opacity-15 rounded-full"
                >
                  <span className="text-xs font-bold">
                    {isFaceDetect ? "ON" : "OFF"}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default SettingButton;
