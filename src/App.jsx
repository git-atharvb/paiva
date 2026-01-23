import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Login/Signup';
import Home from './Login/Home';
import Profile from './Login/Profile';
import ForgotPassword from './Login/ForgotPassword';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/profile" element={<Profile theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
