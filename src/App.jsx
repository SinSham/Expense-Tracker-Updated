import React from 'react'
import {BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Home from './routes/Home'
import EditPage from './routes/EditPage'
import { ExpenseContextProvider } from './context/ExpenseContext';

const App = () => {
  return (
    <ExpenseContextProvider>
      <div className='container'>
        <Router>
            <Routes>
                <Route path = "/" element={ <Home/> }></Route>
                <Route path = "/expenses/:id/edit" element={ <EditPage/> }></Route>
            </Routes>
        </Router>
      </div>
    </ExpenseContextProvider>
    
  )
}

export default App