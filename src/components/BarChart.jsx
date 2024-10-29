import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarChart = ({ selectedYear }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const yearData = {
      2023: [
        { month: "Januari", count: 10 },
        { month: "Februari", count: 20 },
        { month: "Maret", count: 15 },
        { month: "April", count: 25 },
        { month: "Mei", count: 22 },
        { month: "Juni", count: 27 },
        { month: "Juli", count: 24 },
        { month: "Agustus", count: 14 },
        { month: "September", count: 6 },
        { month: "November", count: 20 },
        { month: "Desember", count: 16 },
      ],
      2024: [
        { month: "Januari", count: 20 },
        { month: "Februari", count: 10 },
        { month: "Maret", count: 27 },
        { month: "April", count: 5 },
        { month: "Mei", count: 18 },
        { month: "Juni", count: 29 },
        { month: "Juli", count: 20 },
        { month: "Agustus", count: 10 },
        { month: "September", count: 28 },
        { month: "November", count: 26 },
        { month: "Desember", count: 13 },
      ],
    };

    const month = yearData[selectedYear] || [];

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: month.map((row) => row.month),
        datasets: [
          {
            data: month.map((row) => row.count),
            backgroundColor: "#dc3530",
            barPercentage: 0.3,
            categoryPercentage: 0.5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    return () => {
      chartInstance.current.destroy();
    };
  }, [selectedYear]);

  return <canvas ref={chartRef} />;
};

export default BarChart;
