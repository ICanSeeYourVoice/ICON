export const DETECTION = {
  NORMAL: {
    ICON: "baby",
    MESSAGE: "아기가 평온한 상태에요",
    COLOR: "#7BB7F7",
  },
  LOADING: {
    ICON: "questionMark",
    COLOR: "#FFA6AF",
  },
  SLEEPY: {
    ICON: "sleepy",
    MESSAGE: "아기가 졸려서 울고 있어요",
    SOLUTION: "5분 가량 안고 걸어주세요",
    COLOR: "#E3A6FF",
  },
  HUNGRY: {
    ICON: "hungry",
    MESSAGE: "아기가 배고파서 울고 있어요",
    SOLUTION: "분유를 먹여주세요",
    COLOR: "#FAD92E",
  },
  UNCOMFORTABLE: {
    ICON: "uncomfortable",
    MESSAGE: "아기가 불편해서 울고 있어요",
    SOLUTION: "아기 자세를 바로해주세요",
    COLOR: "#FF9447",
  },
  SICK: {
    ICON: "sick",
    MESSAGE: "아기가 아펏 울고 있어 요",
    SOLUTION: "아기를 데리고 병원에 가세요",
    COLOR: "#FF5D5D",
  },
  BURT: {
    ICON: "burp",
    MESSAGE: "아기가 트림하고 싶어서 울고 있어요",
    SOLUTION: "아기를 트림시켜주세요",
    COLOR: "#4BF25C",
  },
};

export const DETECTION_INFO = "아기가 우는지 감지하고 있어요";

export const LOADING_INFO = "아기가 왜 우는지 분석 중이에요";

export const RESTART_INFO = "가운데 버튼을 눌러 재시작해주세요";
