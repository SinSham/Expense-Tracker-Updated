import React from 'react';
import { Chart as ChartJS, ArcElement, BarElement, PointElement, BarController, LinearScale, CategoryScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  ArcElement,
  PointElement
);

const ExpenseChart = ({ chartData }) => {
  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
};

export default ExpenseChart;
