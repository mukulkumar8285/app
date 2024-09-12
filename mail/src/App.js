import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  // Import the CSS file

function App() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch task logs from the server when the component mounts
    const fetchLogs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/logs');
        setLogs(response.data);
      } catch (error) {
        console.error('Error fetching logs:', error.message);
      }
    };

    fetchLogs();
  }, []);

  const handleAddTask = async () => {
    // Handle adding a new task (this is just a dummy function for now)
    try {
      await axios.post('http://localhost:8080/add-task');
      // Update logs after adding a task
      const response = await axios.get('http://localhost:8080/logs');
      setLogs(response.data);
    } catch (error) {
      console.error('Error adding task:', error.message);
    }
  };

  return (
    <div className="container">
      <h1>Task Logs</h1>

      <button className="add-task-button" onClick={handleAddTask}>Add Task</button>

      <table className="table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Status</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={log._id} className="table-row" style={{ animationDelay: `${index * 0.1}s` }}>
              <td>{log.taskName}</td>
              <td>{log.status}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
