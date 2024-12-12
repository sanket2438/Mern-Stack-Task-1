import React, { useEffect, useState } from "react";
import { fetchPieChart } from "../services/api";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ month }) => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchPieChart(month);
      setPieData(data);
    };
    fetchData();
  }, [month]);

  const data = {
    labels: pieData.map((item) => item.category),
    datasets: [
      {
        data: pieData.map((item) => item.count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
