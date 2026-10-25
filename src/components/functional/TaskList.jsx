import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onToggleStatus, onDeleteTask }) => {
  if (tasks.length === 0) {
    return <p>No tasks found. Create one above!</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;