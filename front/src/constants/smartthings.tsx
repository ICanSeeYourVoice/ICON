import baby from "../assets/svgs/things/baby.svg";
import sleepy from "../assets/svgs/things/sleepy.svg";
import hungry from "../assets/svgs/things/hungry.svg";
import uncomfortable from "../assets/svgs/things/uncomfortable.svg";
import sick from "../assets/svgs/things/sick.svg";
import danger from "../assets/svgs/things/danger.svg";
interface SmartThing {
  ICON: string;
  LABEL: string;
  COLOR: string;
}
interface SmartThings {
  [key: string]: SmartThing;
}

export const SMARTTHINGS: SmartThings = {
  CRY: {
    ICON: baby,
    LABEL: "울음",
    COLOR: "rgba(123, 183, 247, 0.40)",
  },
  TIRED: {
    ICON: sleepy,
    LABEL: "졸림",
    COLOR: "rgba(227, 166, 255, 0.40)",
  },
  HUNGRY: {
    ICON: hungry,
    LABEL: "배고픔",
    COLOR: "rgba(250, 217, 46, 0.40)",
  },
  DISCOMFORT: {
    ICON: uncomfortable,
    LABEL: "불편함",
    COLOR: "rgba(255, 148, 71, 0.40)",
  },
  PAIN: {
    ICON: sick,
    LABEL: "아픔",
    COLOR: "rgba(255, 93, 93, 0.40)",
  },
  DANGER: {
    ICON: danger,
    LABEL: "위험함",
    COLOR: "rgba(75, 242, 92, 0.40)",
  },
};
