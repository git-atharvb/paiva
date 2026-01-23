import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, User, Bell, Activity, Zap, Sun, Moon } from 'lucide-react';
import Layout from './Layout';
import './Login.css';

function Home({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/');
    } else {
      setUserName(JSON.parse(userStr).displayName || 'User');
    }
  }, [navigate]);

  return (
    <Layout>
        <header className="header">
          <h1 style={{ fontSize: '1.8rem', fontWeight: '700', margin: 0 }}>Dashboard</h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button onClick={toggleTheme} className="theme-toggle-btn">
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <Bell size={24} color="#94a3b8" />
            <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{userName}</span>
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
    </Layout>
  );
}

export default Home;