import './styles/App.css';
import React, {useContext} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/loginpage';
import RegisterPage from './pages/registerpage';
import TaskListP from './pages/taskList';
import TaskFormP from './pages/taskForm';
import Dashboard from './pages/dashboard';
import { AuthContext } from './auth/auth';
import Header from './components/header';

const App = ()=> {
  const { authUser } = useContext(AuthContext);
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/tasklist" element={<TaskListP />} />
  <Route path="/taskform" element={<TaskFormP />} />
  <Route path="*" element={<Navigate to="/login" />} />
</Routes>
</main>
    </div>
  );
};

export default App;
