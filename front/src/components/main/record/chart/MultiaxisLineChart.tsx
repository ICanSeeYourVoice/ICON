import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MultiaxisLineChartProps {
  date: string;
}

const MultiaxisLineChart: React.FC<MultiaxisLineChartProps> = (date) => {
  console.log("MultiaxisLineChart SelectDate: ", date.date);

  // 임시 데이터
  const res = {
    data_body: {
      total: 20,
      hungry: [2, 4, 5, 0, 1, 0, 0, 0],
      tired: [1, 1, 1, 0, 1, 0, 3, 0],
      discomfrot: [1, 3, 5, 1, 1, 1, 3, 1],
      cold: [3, 6, 8, 0, 1, 1, 0, 0],
    },
  };
  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: 36,
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          font: {
            size: 8,
          },
        },
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
      },
    },
  };

  const labels = [
    "0시",
    "1시",
    "2시",
    "3시",
    "4시",
    "5시",
    "6시",
    "7시",
    "8시",
    "9시",
    "10시",
    "11시",
    "12시",
    "13시",
    "14시",
    "15시",
    "16시",
    "17시",
    "18시",
    "19시",
    "20시",
    "21시",
    "22시",
    "23시",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "배고파요",
        data: res.data_body.hungry,
        borderColor: "rgba(250, 217, 46, 0.8)",
        backgroundColor: "rgba(250, 217, 46, 1)",
        yAxisID: "y",
      },
      {
        label: "졸려요",
        data: res.data_body.tired,
        borderColor: "rgba(227, 166, 255, 0.8)",
        backgroundColor: "rgba(227, 166, 255, 1)",
        yAxisID: "y",
      },
      {
        label: "불편해요",
        data: res.data_body.discomfrot,
        borderColor: "rgba(255, 148, 71, 0.8)",
        backgroundColor: "rgba(255, 148, 71, 1)",
        yAxisID: "y",
      },
      {
        label: "아파요",
        data: res.data_body.cold,
        borderColor: "rgba(255, 93, 93, 0.8)",
        backgroundColor: "rgba(255, 93, 93, 1)",
        yAxisID: "y",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default MultiaxisLineChart;
