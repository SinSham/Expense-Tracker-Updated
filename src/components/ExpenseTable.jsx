import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpensesAPI from '../apis/ExpensesAPI';
import { ExpenseContext } from '../context/ExpenseContext';
import ExpenseChart from './ExpenseChart';
import moment from 'moment';

const ExpenseTable = (props) => {
  const { expenses, setExpenses } = useContext(ExpenseContext);
  const navigate = useNavigate();

  const [filterYear, setFilterYear] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => currentYear - index); // Generate last 10 years
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ExpensesAPI.get('/');
        setExpenses(response.data.data.Expenses);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleEdit = async (id) => {
    navigate(`/expenses/${id}/edit`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await ExpensesAPI.delete(`/${id}`);
      setExpenses(expenses.filter(expense => expense.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleYearFilterChange = (e) => {
    setFilterYear(e.target.value);
  };

  const handleMonthFilterChange = (e) => {
    setFilterMonth(e.target.value);
  };

  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return (
      (!filterYear || expenseDate.getFullYear() === parseInt(filterYear)) &&
      (!filterMonth || expenseDate.getMonth() === parseInt(filterMonth))
    );
  });

  const groupExpensesByMonth = (expenses) => {
    const groupedExpenses = {};

    expenses.forEach(expense => {
      const month = new Date(expense.date).toLocaleString('default', { month: 'long' });
      if (!groupedExpenses[month]) {
        groupedExpenses[month] = { month, total: 0 };
      }
      groupedExpenses[month].total += Number(expense.amount);
    });

    return Object.values(groupedExpenses);
  };

  const groupedExpenses = groupExpensesByMonth(filteredExpenses);

  const chartData = {
    labels: groupedExpenses.map(item => item.month),
    datasets: [
      {
        label: 'Total Expenses',
        data: groupedExpenses.map(item => item.total),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-md-6">
          <select value={filterYear} onChange={handleYearFilterChange} className='form-control mb-2'>
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <select value={filterMonth} onChange={handleMonthFilterChange} className='form-control mb-2'>
            <option value="">All Months</option>
            {months.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="table-responsive" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <table className="table table-striped table-hover table-dark table-sm">
          <thead>
            <tr className="bg-primary">
              <th scope='col'>Category</th>
              <th scope='col'>Description</th>
              <th scope='col'>Amount</th>
              <th scope='col'>Date</th>
              <th scope='col'>Edit</th>
              <th scope='col'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map(el => (
              <tr key={el.id}>
                <td>{el.category}</td>
                <td>{el.description}</td>
                <td>{el.amount}</td>
                <td>{moment(el.date).format('YYYY-MM-DD')}</td>
                <td><button onClick={() => handleEdit(el.id)} className='btn btn-warning btn-sm'>Edit</button></td>
                <td><button onClick={() => handleDelete(el.id)} className='btn btn-danger btn-sm'>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <ExpenseChart chartData={chartData} />
      </div>
    </div>
  );
};

export default ExpenseTable;
