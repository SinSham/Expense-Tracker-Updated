// Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setAuth }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(false); // Update the authentication state
    navigate('/login'); // Redirect to login page
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
};

export default Logout;
