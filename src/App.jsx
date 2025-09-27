import React, { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import './App.css'

function AuthFlow() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { user, loading } = useAuth();

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  if (loading) {
    return (
      <div className="loading">
        Loading...
      </div>
    );
  }

  if (user) {
    return <Dashboard />;
  }

  return (
    <>
      {isLoginMode ? (
        <Login onToggleMode={toggleMode} />
      ) : (
        <Signup onToggleMode={toggleMode} />
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AuthFlow />
    </AuthProvider>
  )
}

export default App
