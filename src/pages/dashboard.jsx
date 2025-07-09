import React, { useContext } from 'react';
import { AuthContext } from '../auth/auth';
import { useNavigate, Link } from 'react-router-dom';
import taskform from '../components/taskform';
import tasklist from '../components/tasklist';

//import Header from '../components/header';
import '../styles/dash.css';

const Dashboard = () => {
  const { authUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      

      <aside className="sidebar">
        <h2>🌟 Dashboard</h2>
        <p className="user-name">👤 {authUser?.name}</p>
        <button onClick={handleLogout}>Logout</button>
      </aside>

      <main className="dashboard-main dashboard-overview">
        <h2>Welcome back, {authUser?.name}!</h2>
        <p className="tagline">Manage your tasks efficiently and stay productive!</p>

        <div className="cards">
          <div className="card">
            <h3>📝 Add New Task</h3>
            <p>Quickly create a new task for your day.</p>
            <Link to="/taskform">Go to Add Task</Link>
          </div>
          <div className="card">
            <h3>📋 View Tasks</h3>
            <p>Check your task progress and stay updated.</p>
            <Link to="/tasklist">Go to Task List</Link>
          </div>
          <div className="card">
            <h3>📊 overview</h3>
            <p>Tell us what you think pal😅😅</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
