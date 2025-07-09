import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/auth';
import '../styles/header.css';

const Header = () => {
  const { authUser } = useContext(AuthContext);

  return (
    <header className="main-header">
      <div className="header-content">
        <div className="header-left">
          <h2>Welcome, {authUser?.name || 'Guest'}!</h2>
        </div>
        <div className="header-right">
          <Link to="/dashboard" className="header-btn">Home</Link>
          <Link to="/register" className="header-btn">Sign Up</Link>
          <Link to="/taskform" className="header-btn">Add Tasks</Link>
          <Link to="/tasklist" className="header-btn">View Tasks</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
