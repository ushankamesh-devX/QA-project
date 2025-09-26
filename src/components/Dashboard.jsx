import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to QA App</h1>
        <div className="user-info">
          <span className="user-name">Hello, {user?.name}!</span>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
      
      <div className="dashboard-content">
        <h2>Dashboard</h2>
        <p>You are successfully logged in!</p>
        <div style={{ marginTop: '2rem' }}>
          <h3>User Information:</h3>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>User ID:</strong> {user?.userId}</p>
        </div>
        
        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
          <h4>🎉 Congratulations!</h4>
          <p>Your authentication system is working perfectly. You can now:</p>
          <ul>
            <li>✅ Create new accounts</li>
            <li>✅ Login with existing accounts</li>
            <li>✅ Access protected routes</li>
            <li>✅ Maintain session with JWT tokens</li>
            <li>✅ Logout securely</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;