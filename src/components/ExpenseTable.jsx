import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpensesAPI from '../apis/ExpensesAPI';
import { ExpenseContext } from '../context/ExpenseContext';
import moment from 'moment';

const ExpenseTable = () => {
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

  const [filterCategory, setFilterCategory] = useState('');
  const categories = [
    'Housing', 'Utilities', 'Food', 'Education', 'Travel', 
    'Health & Medical', 'Debt', 'Insurance', 'Miscellaneous'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ExpensesAPI.get('/expenses');
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
      const response = await ExpensesAPI.delete(`/expenses/${id}`);
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

  const handleCategoryFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return (
      (!filterYear || expenseDate.getFullYear() === parseInt(filterYear)) &&
      (!filterMonth || expenseDate.getMonth() === parseInt(filterMonth)) &&
      (!filterCategory || expense.category === filterCategory)
    );
  });

  return (
    <div className="container mt-4">
      <h4 className="mb-4 mt-6 text-secondary no-print">Apply Filters</h4>
      <div className="row mb-3 no-print">
      <div className="col-md-4">
          <select value={filterCategory} onChange={handleCategoryFilterChange} className='form-control mb-2'>
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <select value={filterYear} onChange={handleYearFilterChange} className='form-control mb-2'>
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
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
              <th scope='col' className='no-print'>Edit</th>
              <th scope='col' className='no-print'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map(el => (
              <tr key={el.id}>
                <td>{el.category}</td>
                <td>{el.description}</td>
                <td>{el.amount}</td>
                <td>{moment(el.date).format('YYYY-MM-DD')}</td>
                <td className='no-print'><button onClick={() => handleEdit(el.id)} className='btn btn-warning btn-sm'>Edit</button></td>
                <td className='no-print'><button onClick={() => handleDelete(el.id)} className='btn btn-danger btn-sm'>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handlePrint} className="btn btn-primary mt-3">Print</button>
    </div>
  );
};

export default ExpenseTable;
