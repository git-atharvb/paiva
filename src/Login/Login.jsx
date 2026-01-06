import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Sun, Moon, AlertCircle, Loader2 } from 'lucide-react';
import { auth, googleProvider } from '../firebase';
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
      await Promise.all([
        signInWithEmailAndPassword(auth, email, password),
        new Promise(resolve => setTimeout(resolve, 2000))
      ]);
      setSuccessMessage("Welcome to PAIVA");
      setTimeout(() => navigate('/home'), 3000);
    } catch (error) {
      setIsError(true);
      setTimeout(() => setIsError(false), 500);
      
      let msg = "Incorrect email or password.";
      if (error.code === 'auth/invalid-email') msg = "Please enter a valid email address.";
      if (error.code === 'auth/too-many-requests') msg = "Too many attempts. Please try again later.";
      setErrorMessage(msg);
      
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage('');
    try {
      await signInWithPopup(auth, googleProvider);
      setSuccessMessage("Welcome to PAIVA");
      setTimeout(() => navigate('/home'), 3000);
    } catch (error) {
      setErrorMessage("Failed to sign in with Google.");
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

            <div className="separator">Or continue with</div>

            <button type="button" className="google-btn" onClick={handleGoogleLogin}>
              <svg style={{ width: '18px', height: '18px', marginRight: '10px' }} viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>

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