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
import {Bar} from "react-chartjs-2";
import Chart from 'chart.js/auto'


Chart.register(
  // CategoryScale,
  // LinearScale,
  // PointElement,
  // LineElement,
  // Title,
  // Tooltip,
  // Legend
);

interface LineChartProps {
  legendDisplay?: boolean;
  title: string;
  labels: string[];
  dataChart: number[];
  width?: string;
  height?: any;
  border?: string[];
  bgColor?: string[];
  // borderWidth?:number
}

export const BarChart: React.FC<LineChartProps> = ({
  legendDisplay,
  labels,
  title,
  dataChart,
  width,
  height,
  bgColor="grey",
  border=[
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
  ],
  // borderWidth
}) => {
  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: dataChart,
        backgroundColor:bgColor,
        borderColor: border,
        borderWidth: 0
      },
    ],
  };
  return <Bar options={options} data={data} width={width} height={height} />;
};

export default BarChart;