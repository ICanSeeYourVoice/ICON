import baby from "../assets/svgs/detection/baby.svg";
import questionMark from "../assets/svgs/detection/questionMark.svg";
import exclamationMark from "../assets/svgs/detection/exclamationMark.svg";
import sleepy from "../assets/svgs/detection/sleepy.svg";
import hungry from "../assets/svgs/detection/hungry.svg";
import uncomfortable from "../assets/svgs/detection/uncomfortable.svg";
import sick from "../assets/svgs/detection/sick.svg";
import burp from "../assets/svgs/detection/burp.svg";

export const DETECTION = {
  NORMAL: {
    ICON: baby,
    MESSAGE: "평온한 ",
    COLOR: "#7BB7F7",
  },
  LOADING: {
    ICON: questionMark,
    COLOR: "#FFA6AF",
  },
  FAILED: {
    ICON: exclamationMark,
    COLOR: "#c8c8c8",
  },
  TIRED: {
    ICON: sleepy,
    MESSAGE: "졸려서 ",
    SOLUTION: "5분 가량 안고 걸어주세요",
    COLOR: "#E3A6FF",
  },
  HUNGRY: {
    ICON: hungry,
    MESSAGE: "배고파서 ",
    SOLUTION: "분유를 먹여주세요",
    COLOR: "#FAD92E",
  },
  DISCOMFORT: {
    ICON: uncomfortable,
    MESSAGE: "불편해서 ",
    SOLUTION: "아기 자세를 바로해주세요",
    COLOR: "#FF9447",
  },
  PAIN: {
    ICON: sick,
    MESSAGE: "아파서 ",
    SOLUTION: "아기를 데리고 병원에 가세요",
    COLOR: "#FF5D5D",
  },
  BURPING: {
    ICON: burp,
    MESSAGE: "트림하고 싶어서 ",
    SOLUTION: "아기를 트림시켜주세요",
    COLOR: "#4BF25C",
  },
};

export const DETECTION_INFO = "아기가 우는지 감지하고 있어요";

export const LOADING_INFO = "아기가 왜 우는지 분석 중이에요";

export const FAILED_INFO = "마이크 권한을 확인해주세요";

export const RESTART_INFO = "가운데 버튼을 눌러 재시작해주세요";
