import React, { useState, useRef, useEffect } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const inputRef = useRef(null);

  // Auto-focus main input field on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      id: Date.now(),
      title: title.trim(),
      priority,
      completed: false,
    });

    setTitle('');
    setPriority('Medium');
    
    // Shift focus back to input field after submitting data
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <div>
        <label htmlFor="task-title">Task Title: </label>
        <input
          id="task-title"
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a new task..."
          required
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <label htmlFor="task-priority">Priority: </label>
        <select
          id="task-priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <button type="submit" style={{ marginTop: '10px' }}>Add Task</button>
    </form>
  );
};

export default TaskForm;