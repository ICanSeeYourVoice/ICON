import baby from "../assets/svgs/detection/baby.svg";
import sleepy from "../assets/svgs/detection/sleepy.svg";
import hungry from "../assets/svgs/detection/hungry.svg";
import uncomfortable from "../assets/svgs/detection/uncomfortable.svg";
import sick from "../assets/svgs/detection/sick.svg";
import burp from "../assets/svgs/detection/burp.svg";

export const SMARTTHINGS = {
  CRY: {
    ICON: baby,
    LABEL: "울음",
    COLOR: "rgba(123, 183, 247, 0.40)",
  },
  SLEEPY: {
    ICON: sleepy,
    LABEL: "졸림",
    COLOR: "rgba(227, 166, 255, 0.40)",
  },
  HUNGRY: {
    ICON: hungry,
    LABEL: "배고픔",
    COLOR: "rgba(250, 217, 46, 0.40)",
  },
  UNCOMFORTABLE: {
    ICON: uncomfortable,
    LABEL: "불편함",
    SOLUTION: "아기 자세를 바로해주세요",
    COLOR: "rgba(255, 148, 71, 0.40)",
  },
  SICK: {
    ICON: sick,
    LABEL: "아픔",
    COLOR: "rgba(255, 93, 93, 0.40)",
  },
  DANGER: {
    ICON: burp,
    LABEL: "위험함",
    COLOR: "rgba(75, 242, 92, 0.40)",
  },
};
