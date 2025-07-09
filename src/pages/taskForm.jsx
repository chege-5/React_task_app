import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/auth';
import TaskForm from '../components/taskform';
import '../styles/tasking.css';

const TaskFormP = () => {
  const { authUser } = useContext(AuthContext);
  const [showMessage, setShowMessage] = useState(false);

  const handleAddTask = async (taskData) => {
    await axios.post('http://localhost:5000/tasks', {
      ...taskData,
      userId: authUser.id
    });
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2500);
  };

  return (
    <div className="form-page">
      <h2>Add a New Task</h2>
      <TaskForm onSubmit={handleAddTask} />
      {showMessage && <div className="toast success">✅ Task Added!</div>}
    </div>
  );
};

export default TaskFormP;
