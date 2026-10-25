import React, { Component } from 'react';

class ActivityLogger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      notification: ''
    };
    this.timerId = null;
  }

  componentDidMount() {
    // Retrieve initial activity logs stored in browser localStorage
    const savedLogs = localStorage.getItem('activity_logs');
    if (savedLogs) {
      this.setState({ logs: JSON.parse(savedLogs) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Update state if new log prop is passed[cite: 1]
    if (prevProps.latestLog !== this.props.latestLog && this.props.latestLog) {
      const updatedLogs = [this.props.latestLog, ...this.state.logs];
      
      this.setState({
        logs: updatedLogs,
        notification: `New Activity: ${this.props.latestLog}`
      });

      // Persist newly added logs to localStorage[cite: 1]
      localStorage.setItem('activity_logs', JSON.stringify(updatedLogs));

      // Trigger temporary visual/toast notification clear timer[cite: 1]
      if (this.timerId) clearTimeout(this.timerId);
      this.timerId = setTimeout(() => {
        this.setState({ notification: '' });
      }, 3000);
    }
  }

  componentWillUnmount() {
    // Clean up timers[cite: 1]
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  clearLogs = () => {
    this.setState({ logs: [] });
    localStorage.removeItem('activity_logs');
  };

  render() {
    return (
      <div style={{ marginTop: '20px' }}>
        <h4>System Activity Logs</h4>
        {this.state.notification && (
          <div style={{ padding: '8px', background: '#e6f7ff', border: '1px solid #91d5ff', marginBottom: '10px' }}>
            {this.state.notification}
          </div>
        )}
        <button onClick={this.clearLogs} style={{ marginBottom: '10px' }}>Clear Logs</button>
        {this.state.logs.length === 0 ? (
          <p>No activity logged yet.</p>
        ) : (
          <ul style={{ maxHeight: '150px', overflowY: 'auto', paddingLeft: '20px' }}>
            {this.state.logs.map((log, index) => (
              <li key={index} style={{ fontSize: '13px' }}>{log}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default ActivityLogger;