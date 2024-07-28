import React from 'react'
import Header from '../components/Header'
import AddExpense from '../components/AddExpense'
import ExpenseTable from '../components/ExpenseTable'

const Home = () => {
  return (
    <div>
        <Header/>
        <AddExpense/>
        <ExpenseTable/>
    </div>
  )
}

export default Home