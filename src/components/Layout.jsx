import React from 'react';
import Header from './Header';

const Layout = ({ children, isAuthenticated, onLogout }) => {
  return (
    <div>
      {isAuthenticated && <Header onLogout={onLogout} />}
      <div className="container mt-4">
        <h6 className="text-center display-1 mb-4">Expense Tracker</h6>
        {children} {/* Render the child components */}
      </div>
    </div>
  );
};

export default Layout;
