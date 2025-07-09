import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/auth';
import '../styles/form.css';

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axios.get(`http://localhost:5000/users?email=${form.email}`);
      const user = res.data[0];

      if (user && user.password === form.password) {
        login(user);
        setMessage('Login successful!');
        setIsError(false);
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        setMessage('Invalid credentials!');
        setIsError(true);
      }
    } catch (error) {
      setMessage('Login failed. Please try again.');
      setIsError(true);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      {message && <div className={`toast ${isError ? 'error' : 'success'}`}>{message}</div>}
    </div>
  );
};

export default LoginForm;
