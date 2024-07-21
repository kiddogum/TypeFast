import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title
);

type UserStatProps = {
  totalWord: number;
  correct: number;
  wrong: number;
  percent: string;
  session: number;
};

type LineChartProps = {
  userStats: UserStatProps[];
};

const LineChart = ({ userStats }: LineChartProps) => {
  if (!userStats || userStats.length === 0) {
    return <div>No data available for the chart.</div>;
  }

  const lineChartData = {
    labels: userStats.map((stat) => ` #${stat.session}`),
    datasets: [
      {
        label: "Correct",
        data: userStats.map((stat) => stat.correct),
        borderColor: "#10b981",
        tension: 0.5,
      },
      {
        label: "Wrong",
        data: userStats.map((stat) => stat.wrong),
        borderColor: "#dc2626",
        tension: 0.5,
      },
      {
        label: "Total Word",
        data: userStats.map((stat) => stat.totalWord),
        borderColor: "#d1d5db",
        tension: 0.5,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          color: "#FFFFFF", // Customize X-axis number color
        },
        grid: {
          color: "#333333", // Customize X-axis grid line color
        },
        title: {
          text: "Session",
          color: "#FFFFFF", // Customize X-axis title color
        },
      },
      y: {
        ticks: {
          color: "#FFFFFF", // Customize Y-axis number color
        },
        grid: {
          color: "#333333", // Customize Y-axis grid line color
        },
        title: {
          text: "Values",
          color: "#FFFFFF", // Customize Y-axis title color
        },
      },
    },
  };

  return (
    <div className="w-full mt-4">
      <Line className="" data={lineChartData} />
    </div>
  );
};

export default LineChart;
