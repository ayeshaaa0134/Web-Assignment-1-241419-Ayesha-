import React from 'react';

const TaskCard = ({ task, onToggleStatus, onDeleteTask }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ff4d4f';
      case 'Medium': return '#faad14';
      case 'Low': return '#52c41a';
      default: return '#d9d9d9';
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee' }}>
      <div>
        <span style={{ textDecoration: task.completed ? 'line-through' : 'none', fontWeight: 'bold' }}>
          {task.title}
        </span>
        <span
          style={{
            marginLeft: '10px',
            padding: '2px 8px',
            borderRadius: '4px',
            backgroundColor: getPriorityColor(task.priority),
            color: '#fff',
            fontSize: '12px'
          }}
        >
          {task.priority}
        </span>
      </div>
      <div>
        <button onClick={() => onToggleStatus(task.id)}>
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button onClick={() => onDeleteTask(task.id)} style={{ marginLeft: '8px', color: 'red' }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;