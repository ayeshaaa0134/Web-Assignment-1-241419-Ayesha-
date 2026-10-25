import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import { ThemeContext, ThemeProvider } from './context/ThemeContext';
import CardWrapper from './components/functional/CardWrapper';
import TaskForm from './components/functional/TaskForm';
import TaskList from './components/functional/TaskList';
import MetricsSummary from './components/functional/MetricsSummary';
import ActivityLogger from './components/class/ActivityLogger';
import './App.css'
const MainApp = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  // useState: Task list, active filter, and logger state[cite: 1]
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('app_tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState('All');
  const [latestLog, setLatestLog] = useState('');

  // useEffect: LocalStorage sync for tasks[cite: 1]
  useEffect(() => {
    localStorage.setItem('app_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // useEffect: Dynamic document title update[cite: 1]
  useEffect(() => {
    const pendingCount = tasks.filter((t) => !t.completed).length;
    document.title = `Tasks Dashboard (${pendingCount} Pending)`;
  }, [tasks]);

  // useCallback: Optimize event handler references to prevent unnecessary re-renders[cite: 1]
  const handleAddTask = useCallback((newTask) => {
    setTasks((prev) => [newTask, ...prev]);
    setLatestLog(`Added Task: "${newTask.title}" [Priority: ${newTask.priority}]`);
  }, []);

  const handleToggleStatus = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updatedState = !t.completed;
          setLatestLog(`Marked Task "${t.title}" as ${updatedState ? 'Completed' : 'Incomplete'}`);
          return { ...t, completed: updatedState };
        }
        return t;
      })
    );
  }, []);

  const handleDeleteTask = useCallback((id) => {
    setTasks((prev) => {
      const taskToDelete = prev.find((t) => t.id === id);
      if (taskToDelete) {
        setLatestLog(`Deleted Task: "${taskToDelete.title}"`);
      }
      return prev.filter((t) => t.id !== id);
    });
  }, []);

  // useMemo: Optimize filtered task list calculation[cite: 1]
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === 'Active') return !task.completed;
      if (filter === 'Completed') return task.completed;
      return true;
    });
  }, [tasks, filter]);

  // useMemo: Calculate metrics[cite: 1]
  const metrics = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    return {
      total,
      completed,
      active: total - completed,
    };
  }, [tasks]);

  return (
    <div style={{ maxWidth: '650px', margin: '20px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Task Dashboard & Activity Tracker</h2>
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </header>

      <CardWrapper title="Create New Task">
        <TaskForm onAddTask={handleAddTask} />
      </CardWrapper>

      <CardWrapper title="Metrics & Overview">
        <MetricsSummary
          totalTasks={metrics.total}
          activeTasks={metrics.active}
          completedTasks={metrics.completed}
        />
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="filter-select">Filter Tasks: </label>
          <select id="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All Tasks</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </CardWrapper>

      <CardWrapper title={`Tasks List (${filteredTasks.length})`}>
        <TaskList
          tasks={filteredTasks}
          onToggleStatus={handleToggleStatus}
          onDeleteTask={handleDeleteTask}
        />
      </CardWrapper>

      <CardWrapper title="Activity Logging (Class Component)">
        <ActivityLogger latestLog={latestLog} />
      </CardWrapper>
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <MainApp />
  </ThemeProvider>
);

export default App;