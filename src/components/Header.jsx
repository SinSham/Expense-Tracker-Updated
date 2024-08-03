import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({onLogout}) => {
  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      onLogout();
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Expense Tracker</Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </li>
        </ul>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>
    </nav>
  );
};

export default Header;
