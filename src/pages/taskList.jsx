import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/auth';
import '../styles/tasking.css';

const TaskListP = () => {
  const { authUser } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [toast, setToast] = useState('');

  const fetchTasks = async () => {
    const res = await axios.get(`http://localhost:5000/tasks?userId=${authUser.id}`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggle = (id) => {
    setExpandedTaskId(prev => (prev === id ? null : id));
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setToast('🗑️ Task Deleted');
    fetchTasks();
    setTimeout(() => setToast(''), 2500);
  };

  const handleEdit = async (task) => {
    const newTitle = prompt('Edit Task Title', task.title);
    const newDescription = prompt('Edit Description', task.description);

    if (newTitle && newDescription) {
      await axios.put(`http://localhost:5000/tasks/${task.id}`, {
        ...task,
        title: newTitle,
        description: newDescription
      });
      setToast('✏️ Task Updated');
      fetchTasks();
      setTimeout(() => setToast(''), 2500);
    }
  };

  return (
    <div className="tasklist-page">
      <h2>Your Task List</h2>
      {tasks.map(task => (
        <div key={task.id} className="task-card">
          <div className="task-title" onClick={() => handleToggle(task.id)}>
            {task.title} <span className="arrow">{expandedTaskId === task.id ? '-' : '+'}</span>
          </div>

          {expandedTaskId === task.id && (
            <div className="task-details">
              <p>{task.description}</p>
              <div className="task-actions">
                <button onClick={() => handleEdit(task)}>Edit</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
};

export default TaskListP;
