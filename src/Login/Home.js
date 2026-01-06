import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import './Login.css';

function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <div className="home-container">
      <nav className="home-nav">
        <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#764ba2' }}>PAIVA</div>
        <button 
          onClick={handleLogout} 
          className="auth-button" 
          style={{ width: 'auto', marginTop: 0, padding: '8px 20px', fontSize: '0.9rem' }}
        >
          Logout
        </button>
      </nav>
      
      <div className="home-content">
        <div className="auth-card" style={{ maxWidth: '100%', padding: '4rem' }}>
          <h1 style={{ color: '#2d3748', marginBottom: '1rem' }}>Welcome to Your Dashboard</h1>
          <p style={{ color: '#718096', fontSize: '1.2rem' }}>
            Personalized Artificial Intelligence Virtual Assistant is ready to help you.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;