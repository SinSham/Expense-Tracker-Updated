import React, { useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { ExpenseContext } from '../context/ExpenseContext';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ExpenseDashboard = () => {
  const { expenses } = useContext(ExpenseContext);
  const [totalExpenditure, setTotalExpenditure] = useState(0);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const calculateMetrics = () => {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      let total = 0;
      const categories = {};

      expenses.forEach(expense => {
        const expenseDate = new Date(expense.date);
        if (expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear) {
          total += Number(expense.amount);

          if (!categories[expense.category]) {
            categories[expense.category] = 0;
          }
          categories[expense.category] += Number(expense.amount);
        }
      });

      setTotalExpenditure(total);

      const categoryEntries = Object.entries(categories).map(([category, amount]) => ({
        category,
        amount
      }));

      setCategoryData(categoryEntries);
    };

    calculateMetrics();
  }, [expenses]);

  const barChartData = {
    labels: categoryData.length ? categoryData.map(data => data.category) : ['No Data'],
    datasets: [{
      data: categoryData.length ? categoryData.map(data => data.amount) : [1],
      backgroundColor: categoryData.length ? ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED', '#4BC0C0', '#FF9F40'] : ['#E7E9ED'],
      borderColor: '#000',  // Set border color for outline
      borderWidth: 1
    }]
  };

  const barChartOptions = {
    maintainAspectRatio: true,
    responsive: true,
    indexAxis: 'y', // Set index axis to horizontal
    plugins: {
      legend: {
        display: false, // Hide legend for cleaner view
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: $${tooltipItem.raw.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Expense Amount',
        },
        ticks: {
          callback: function(value) {
            return `$${value.toFixed(2)}`;
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'Category',
        }
      }
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Monthly Overview</h4>
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Total expenditure this month</h5>
              <p className="card-text">${totalExpenditure.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Expense Breakdown by Category</h5>
              <div>
                <Bar data={barChartData} options={barChartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDashboard;
