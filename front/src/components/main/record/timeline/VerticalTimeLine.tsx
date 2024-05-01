import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import hungry from "../../../../assets/svgs/detection/hungry.svg";

interface VerticalTimeLineProps {
  date: string;
}

const VerticalTimeLine: React.FC<VerticalTimeLineProps> = (date) => {
  console.log("VerticalTimeLine SelectDate: ", date.date);

  return (
    <div className="w-[15rem] h-[15rem]">
      <VerticalTimeline layout="1-column-left" lineColor="#7BB7F7">
        <VerticalTimelineElement
          className=""
          contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
          date="2024.05.01 23:55"
          iconStyle={{
            background: "rgba(250, 217, 46, 1)",
            color: "#fff",
            // fontSize: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "2rem",
            height: "2rem",
          }}
          icon={<img width={15} height={15} src={hungry} alt="Icon" />}
        >
          <h3 className="vertical-timeline-element-title">
            아기가 배고파 했어요
          </h3>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2010 - 2011"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          // icon={<WorkIcon />}
        >
          <h3 className="vertical-timeline-element-title">Art Director</h3>
          <h4 className="vertical-timeline-element-subtitle">
            San Francisco, CA
          </h4>
          <p>
            Creative Direction, User Experience, Visual Design, SEO, Online
            Marketing
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2008 - 2010"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          // icon={<WorkIcon />}
        >
          <h3 className="vertical-timeline-element-title">Web Designer</h3>
          <h4 className="vertical-timeline-element-subtitle">
            Los Angeles, CA
          </h4>
          <p>User Experience, Visual Design</p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
          // icon={<StarIcon />}
        />
      </VerticalTimeline>
    </div>
  );
};

export default VerticalTimeLine;
