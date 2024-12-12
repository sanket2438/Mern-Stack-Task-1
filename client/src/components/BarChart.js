import React, { useEffect, useState } from "react";
import { fetchBarChart } from "../services/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ month }) => {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchBarChart(month);
      setBarData(data);
    };
    fetchData();
  }, [month]);

  const data = {
    labels: barData.map((item) => item.range),
    datasets: [
      {
        label: "Number of Items",
        data: barData.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return <Bar data={data} />;
};

export default BarChart;
