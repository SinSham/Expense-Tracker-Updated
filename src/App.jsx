import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ExpenseContextProvider } from './context/ExpenseContext';
import 'react-toastify/dist/ReactToastify.css';
import Home from './routes/Home';
import EditPage from './routes/EditPage';
import Login from './components/Login';
import Signup from './components/Signup';
import ExpenseDashboard from './components/ExpenseDashboard';
import Layout from './components/Layout';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <ExpenseContextProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup setAuth={setIsAuthenticated} />} />
          <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
          <Route path="/" element={isAuthenticated ? <Layout isAuthenticated={isAuthenticated} onLogout={handleLogout}><Home /></Layout> : <Navigate to="/login" />} />
          <Route path="/expenses/:id/edit" element={isAuthenticated ? <Layout isAuthenticated={isAuthenticated} onLogout={handleLogout}><EditPage /></Layout> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Layout isAuthenticated={isAuthenticated} onLogout={handleLogout}><ExpenseDashboard /></Layout> : <Navigate to="/login" />} />
        </Routes>
        <ToastContainer />
      </Router>
    </ExpenseContextProvider>
  );
};

export default App;
