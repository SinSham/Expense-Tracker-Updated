import React from 'react'
import AddExpense from '../components/AddExpense'
import ExpenseTable from '../components/ExpenseTable'

const Home = () => {
  return (
    <div>
        <AddExpense/>
        <ExpenseTable/>
    </div>
  )
}

export default Home