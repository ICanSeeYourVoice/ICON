import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { RECORD } from "../../../../constants/record";
import { useQuery } from "@tanstack/react-query";
import { GetChartDetailData } from "../../../../apis/Chart";
import { PulseLoader } from "react-spinners";

interface VerticalTimeLineProps {
  date: string | null;
}

interface TimelineData {
  type: "HUNGRY" | "TIRED" | "PAIN" | "DISCOMFORT" | "BURPING" | "BELLY_PAIN";
  cryingDate: string;
}

interface statisticsResponse {
  total: number;
  HUNGRY: number;
  TIRED: number;
  PAIN: number;
  DISCOMFORT: number;
}
interface ChartDetailDatas {
  statisticsResponse: statisticsResponse;
  timeline: TimelineData[];
}
const VerticalTimeLine: React.FC<VerticalTimeLineProps> = (date) => {
  const { data: chartDetailData, isLoading: isLoadingChartDetailData } =
    useQuery<ChartDetailDatas>({
      queryFn: () => GetChartDetailData({ statisticsDate: date.date }),
      queryKey: ["chartDetailData", date],
    });

  return (
    <div className="flex-col w-full">
      <div className="flex justify-start text-slate-500 text-xs">타임라인</div>

      {isLoadingChartDetailData ? (
        <div className="flex items-center justify-center w-full h-full">
          <PulseLoader color="#c8c8c8" />
        </div>
      ) : chartDetailData && chartDetailData.statisticsResponse.total === 0 ? (
        <div className="flex items-center justify-center w-full h-full">
          <div>오늘은 아기가 울지 않았어요😊</div>
        </div>
      ) : !chartDetailData ? (
        <div className="flex items-center justify-center w-full h-full">
          <div>데이터를 불러오는데 실패했어요😢</div>
          <div>다시 시도해주세요.</div>
        </div>
      ) : (
        <div className="h-[20vh] overflow-y-scroll no-scrollbar">
          <VerticalTimeline layout="1-column-left" lineColor="#7BB7F7">
            {chartDetailData &&
              chartDetailData.timeline.map((val, index) => {
                return (
                  <VerticalTimelineElement
                    className=""
                    key={index}
                    contentStyle={{
                      background: "#7BB7F7",
                      color: "#fff",
                      padding: "2px 10px 0px 10px",
                    }}
                    contentArrowStyle={{
                      borderRight: "7px solid #7BB7F7",
                    }}
                    date={val.cryingDate}
                    dateClassName="p-0"
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
      )}
    </div>
  );
};

export default VerticalTimeLine;
