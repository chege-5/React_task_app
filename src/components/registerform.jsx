import React, { useState } from 'react';
import '../styles/form.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
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
      if (res.data.length > 0) {
        setMessage('User already exists!');
        setIsError(true);
        return;
      }

      await axios.post('http://localhost:5000/users', form);
      setMessage('Registration successful!');
      setIsError(false);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage('Error registering. Try again.');
      setIsError(true);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <button type="submit">Register</button>
        < button type="button" onClick={() => navigate('/login')}>Already have an account? Login</button>
      </form>
      {message && <div className={`toast ${isError ? 'error' : 'success'}`}>{message}</div>}
    </div>
  );
};

export default RegisterForm;
