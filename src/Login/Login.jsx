import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Sun, Moon, AlertCircle, Loader2 } from 'lucide-react';
import './Login.css';

function Login({ theme, toggleTheme }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setSuccessMessage("Welcome to PAIVA");
      setTimeout(() => navigate('/home'), 1500);
    } catch (error) {
      setIsError(true);
      setTimeout(() => setIsError(false), 500);
      setErrorMessage(error.message);
      
      setIsLoading(false);
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div className="auth-container" onMouseMove={handleMouseMove}>
      <button 
        onClick={toggleTheme} 
        className="theme-toggle-btn" 
        style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}
      >
        {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
      </button>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="auth-card"
      >
        {isLoading && (
          <div className="progress-bar-container">
            <div className="progress-bar" />
          </div>
        )}
        <div className="brand-container">
          <h1 className="brand-logo">PAIVA</h1>
          <p className="brand-tagline">Personalized AI Virtual Assistant</p>
        </div>
        {successMessage ? (
          <div className="success-message">
            <h2 className="success-title">{successMessage}</h2>
            <p style={{color: 'var(--text-muted)'}}>Redirecting you to the dashboard...</p>
          </div>
        ) : (
          <>
            {errorMessage && (
              <div className="error-message">
                <AlertCircle size={16} />
                {errorMessage}
              </div>
            )}
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={20} />
                  <input
                    className={`form-input ${isError ? 'shake' : ''}`}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={20} />
                  <input
                    className={`form-input ${isError ? 'shake' : ''}`}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="remember-me">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={rememberMe} 
                    onChange={(e) => setRememberMe(e.target.checked)} 
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" className="auth-link" style={{ fontSize: '0.9rem' }}>
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="auth-button" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="spinner" size={20} />
                    Signing in...
                  </>
                ) : 'Sign In'}
              </button>
            </form>

            <div className="auth-footer">
              Don't have an account? 
              <Link to="/signup" className="auth-link">Create one</Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default Login;