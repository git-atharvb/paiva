import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, User, LogOut, Settings, Zap } from 'lucide-react';
import './Login.css';

function Layout({ children }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setTimeout(async () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
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
          <button 
            className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`} 
            onClick={() => navigate('/home')}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button 
            className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`} 
            onClick={() => navigate('/profile')}
          >
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
        {children}
      </div>
    </div>
  );
}

export default Layout;