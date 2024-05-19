import sleepy from "../assets/svgs/detection/sleepy.svg";
import hungry from "../assets/svgs/detection/hungry.svg";
import uncomfortable from "../assets/svgs/detection/uncomfortable.svg";
import sick from "../assets/svgs/detection/sick.svg";
import burp from "../assets/svgs/detection/burp.svg";
import baby from "../assets/svgs/detection/baby.svg";

interface RecordItem {
  ICON: JSX.Element;
  MESSAGE: string;
  COLOR: string;
  ICONSTYLE: {
    background: string;
    color: string;
    display: string;
    justifyContent: string;
    alignItems: string;
  };
}

interface Record {
  [key: string]: RecordItem;
}
export const RECORD: Record = {
  BABY: {
    ICON: <img width={15} height={15} src={baby} alt="baby Icon" />,
    MESSAGE: "오늘은 아기가 울지 않았어요😊",
    COLOR: "#7BB7F7",
    ICONSTYLE: {
      background: "#7BB7F7",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  SLEEPY: {
    ICON: <img width={15} height={15} src={sleepy} alt="sleepy Icon" />,
    MESSAGE: "아기가 졸려서 울었어요.",
    COLOR: "#E3A6FF",
    ICONSTYLE: {
      background: "#E3A6FF",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  HUNGRY: {
    ICON: <img width={15} height={15} src={hungry} alt="hungry Icon" />,
    MESSAGE: "아기가 배고파서 울었어요.",
    COLOR: "#FAD92E",
    ICONSTYLE: {
      background: "#FAD92E",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  UNCOMFORTABLE: {
    ICON: (
      <img
        width={15}
        height={15}
        src={uncomfortable}
        alt="uncomfortable Icon"
      />
    ),
    MESSAGE: "아이가 불편해서 울었어요.",
    COLOR: "#FF9447",
    ICONSTYLE: {
      background: "#FF9447",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  SICK: {
    ICON: <img width={15} height={15} src={sick} alt="sick Icon" />,
    MESSAGE: "아이가 복통으로 울었어요.",
    COLOR: "#FF5D5D",
    ICONSTYLE: {
      background: "#FF5D5D",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  DANGER: {
    ICON: <img width={15} height={15} src={burp} alt="burp Icon" />,
    MESSAGE: "아이가 위험한 자세로 있었어요.",
    COLOR: "#4BF25C",
    ICONSTYLE: {
      background: "#4BF25C",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  BURPING: {
    ICON: <img width={20} height={20} src={burp} alt="burp Icon" />,
    MESSAGE: "아이가 트름으로 울었어요.",
    COLOR: "#4BF25C",
    ICONSTYLE: {
      background: "#4BF25C",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  BELLY_PAIN: {
    ICON: <img width={15} height={15} src={sick} alt="sick Icon" />,
    MESSAGE: "아이가 복통으로 울었어요.",
    COLOR: "#FF5D5D",
    ICONSTYLE: {
      background: "#FF5D5D",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  TIRED: {
    ICON: <img width={15} height={15} src={sleepy} alt="sleepy Icon" />,
    MESSAGE: "아기가 졸려서 울었어요.",
    COLOR: "#E3A6FF",
    ICONSTYLE: {
      background: "#E3A6FF",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  PAIN: {
    ICON: <img width={15} height={15} src={sick} alt="sick Icon" />,
    MESSAGE: "아이가 복통으로 울었어요.",
    COLOR: "#FF5D5D",
    ICONSTYLE: {
      background: "#FF5D5D",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  DISCOMFORT: {
    ICON: (
      <img
        width={15}
        height={15}
        src={uncomfortable}
        alt="uncomfortable Icon"
      />
    ),
    MESSAGE: "아이가 불편해서 울었어요.",
    COLOR: "#FF9447",
    ICONSTYLE: {
      background: "#FF9447",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
};
