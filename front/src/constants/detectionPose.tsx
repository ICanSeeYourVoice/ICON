import baby from "../assets/svgs/detection/baby.svg";
import questionMark from "../assets/svgs/detection/questionMark.svg"; 
import noface from "../assets/svgs/detection/noface.svg";

export const DETECTION_POSE = {
  NORMAL: {
    ICON: baby,
    MESSAGE: "아기가 위험하다면 알림을 보내드릴게요",
    COLOR: "#7BB7F7",
  },
  LOADING: {
    ICON: questionMark,
    COLOR: "#FFA6AF",
  },
  NOFACE :{
    ICON: noface,
    MESSAGE: "위험한 자세를 ",
    SOLUTION: "아기를 보살펴주세요",
    COLOR: "#FFFFFF",
  }
};

export const DETECTION_POSE_INFO = "아기가 위험한지 보고있어요";

export const RESTART_INFO = "가운데 버튼을 눌러 재시작해주세요";
