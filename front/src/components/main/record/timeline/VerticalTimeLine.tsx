import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { RECORD } from "../../../../constants/record";

interface VerticalTimeLineProps {
  date: string;
}

const VerticalTimeLine: React.FC<VerticalTimeLineProps> = (date) => {
  console.log("VerticalTimeLine SelectDate: ", date.date);
  // dummy data
  const res = {
    data_body: {
      timeline: [
        { time: "2024.05.01 23:55", type: "HUNGRY" },
        { time: "2024.05.01 23:35", type: "UNCOMFORTABLE" },
        { time: "2024.05.01 23:25", type: "SLEEPY" },
        { time: "2024.05.01 22:55", type: "SICK" },
      ],
    },
  };
  return (
    <div className="flex-col w-[15rem] h-[15rem] ">
      <div className="flex justify-start w-[14.5rem] pb-[0.5rem] text-slate-500 text-xs">
        타임라인
      </div>
      <div className="w-[15rem] h-[15rem] overflow-y-scroll no-scrollbar">
        <VerticalTimeline layout="1-column-left" lineColor="#7BB7F7">
          {res.data_body.timeline.map((val) => {
            return (
              <VerticalTimelineElement
                className=""
                contentStyle={{
                  background: "rgb(33, 150, 243)",
                  color: "#fff",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid  rgb(33, 150, 243)",
                }}
                date={val.time}
                iconStyle={RECORD[val.type].ICONSTYLE}
                icon={RECORD[val.type].ICON}
              >
                <h3 className="vertical-timeline-element-title">
                  {RECORD[val.type].MESSAGE}
                </h3>
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default VerticalTimeLine;
