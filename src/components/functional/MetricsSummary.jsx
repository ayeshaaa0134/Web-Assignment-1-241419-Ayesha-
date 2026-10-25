import React from 'react';

const MetricsSummary = ({ totalTasks, activeTasks, completedTasks }) => {
  return (
    <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
      <div><strong>Total:</strong> {totalTasks}</div>
      <div><strong>Active:</strong> {activeTasks}</div>
      <div><strong>Completed:</strong> {completedTasks}</div>
    </div>
  );
};

export default MetricsSummary;