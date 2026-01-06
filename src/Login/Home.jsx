import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { motion } from 'framer-motion';
import { LayoutDashboard, User, LogOut, Settings, Bell, Activity, Zap, Sun, Moon } from 'lucide-react';
import { auth } from '../firebase';
import './Login.css';

function Home({ theme, toggleTheme }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setTimeout(async () => {
      try {
        await signOut(auth);
        navigate('/');
      } catch (error) {
        console.error("Error logging out: ", error);
        setIsLoggingOut(false);
      }
    }, 3000);
  };

  return (
    <div className="dashboard-container">
      {isLoggingOut && (
        <div className="logout-overlay">
          <div className="logout-text">Thank you for using PAIVA</div>
        </div>
      )}
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-logo">
          <Zap size={28} fill="currentColor" />
          PAIVA
        </div>
        
        <nav style={{ flex: 1 }}>
          <button className="nav-item active">
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button className="nav-item">
            <User size={20} /> Profile
          </button>
          <button className="nav-item">
            <Settings size={20} /> Settings
          </button>
        </nav>

        <button onClick={handleLogout} className="nav-item">
          <LogOut size={20} /> Logout
        </button>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h1 style={{ fontSize: '1.8rem', fontWeight: '700', margin: 0 }}>Dashboard</h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button onClick={toggleTheme} className="theme-toggle-btn">
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <Bell size={24} color="#94a3b8" />
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={20} />
            </div>
          </div>
        </header>

        <motion.div 
          className="stat-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="stat-card"><div className="stat-label">Total Users</div><div className="stat-value">1,234</div><Activity size={20} color="#6366f1" /></div>
          <div className="stat-card"><div className="stat-label">Active Sessions</div><div className="stat-value">56</div><Zap size={20} color="#22c55e" /></div>
          <div className="stat-card"><div className="stat-label">Revenue</div><div className="stat-value">$12k</div><LayoutDashboard size={20} color="#eab308" /></div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;