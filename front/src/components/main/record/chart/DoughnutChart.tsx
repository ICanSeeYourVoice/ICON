import React, { useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  Doughnut,
  getDatasetAtEvent,
  getElementAtEvent,
} from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { GetChartData } from "../../../../apis/Chart";
import { PulseLoader } from "react-spinners";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  date: string | null;
}
interface ChartData {
  total: number;
  HUNGRY: number;
  TIRED: number;
  PAIN: number;
  DISCOMFORT: number;
}

const DoughnutChart: React.FC<DoughnutChartProps> = (date) => {
  const chartRef = useRef(null);
  console.log(date);
  // dougnutchart onclick test code
  const onClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!chartRef.current) {
      console.error("Chart reference is not available.");
      return;
    }
    console.log(
      "getDatasetAtEvent: ",
      getDatasetAtEvent(chartRef.current, event)
    );
    const index = getElementAtEvent(chartRef.current, event)[0].index;
    console.log("index: ", index);
    console.log(
      "getElementAtEvent ",
      getElementAtEvent(chartRef.current, event)
    );
    console.log(
      "Dougnut onclick:",
      data.labels[index],
      data.datasets[0].data[index]
    );
  };

  const { data: chartData, isLoading: isLoadingChartData } =
    useQuery<ChartData>({
      queryFn: () => GetChartData({ statisticsDate: date.date }),
      queryKey: ["chartData", date],
      enabled: !!date.date,
    });

  const data = {
    labels: ["배고파요", "졸려요", "불편해요", "아파요"],
    datasets: [
      {
        label: "횟수",
        data: [
          chartData?.HUNGRY,
          chartData?.TIRED,
          chartData?.DISCOMFORT,
          chartData?.PAIN,
        ],
        backgroundColor: [
          "rgba(250, 217, 46, 1)",
          "rgba(227, 166, 255, 1)",
          "rgba(255, 148, 71, 1)",
          "rgba(255, 93, 93, 1)",
        ],
        borderColor: "transparent",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        padding: 5,
        labels: {
          boxWidth: 5,
          usePointStyle: true,
          font: { family: "NPSfont", size: 10 },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <>
      {isLoadingChartData ? (
        <div className="flex items-center justify-center w-full h-full">
          <PulseLoader color="#c8c8c8" />
        </div>
      ) : chartData && chartData.total === 0 ? (
        <div className="flex items-center justify-center w-full h-full">
          <div>오늘은 아기가 울지 않았어요😊</div>
        </div>
      ) : (
        <Doughnut
          ref={chartRef}
          data={data}
          width={230}
          height={200}
          options={options}
          onClick={onClick}
        />
      )}
    </>
  );
};

export default DoughnutChart;
