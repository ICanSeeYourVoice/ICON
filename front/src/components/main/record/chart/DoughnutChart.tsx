import React, { useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  Doughnut,
  getDatasetAtEvent,
  getElementAtEvent,
} from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  date: string;
}

const DoughnutChart: React.FC<DoughnutChartProps> = (date) => {
  console.log("DoughnutChart SelectDate(Today): ", date.date);
  const chartRef = useRef(null);

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
  // 임시 데이터
  const res = {
    data_body: {
      total: 21,
      hungry: 12,
      tired: 5,
      discomfrot: 3,
      cold: 1,
    },
  };

  const data = {
    labels: ["배고파요", "졸려요", "불편해요", "아파요"],
    datasets: [
      {
        label: "횟수",
        data: [
          res.data_body.hungry,
          res.data_body.tired,
          res.data_body.discomfrot,
          res.data_body.cold,
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
      {res.data_body.total == 0 && <div>오늘은 아기가 울지 않았어요!</div>}
      {res.data_body.total != 0 && (
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
