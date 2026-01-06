import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { auth, googleProvider } from '../firebase';
import './Login.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Simple password strength calculator
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length > 5) strength++;
    if (pass.length > 7) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return strength; // Max 5
  };

  const strength = getStrength(password);
  const strengthColor = ['#e2e8f0', '#e53e3e', '#dd6b20', '#d69e2e', '#38a169', '#38a169'];
  const strengthWidth = (strength / 5) * 100;

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    try {
      await Promise.all([
        createUserWithEmailAndPassword(auth, email, password),
        new Promise(resolve => setTimeout(resolve, 2000))
      ]);
      navigate('/home');
    } catch (error) {
      let msg = "Failed to create account.";
      if (error.code === 'auth/email-already-in-use') msg = "This email is already registered.";
      if (error.code === 'auth/weak-password') msg = "Password should be at least 6 characters.";
      if (error.code === 'auth/invalid-email') msg = "Invalid email address.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setErrorMessage('');
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/home');
    } catch (error) {
      setErrorMessage("Failed to sign up with Google.");
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
        <h2 className="auth-title">Create an account</h2>
        <p className="auth-subtitle">Start your journey with PAIVA today</p>
        {errorMessage && (
          <div className="error-message">
            <AlertCircle size={16} />
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                className="form-input"
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
                className="form-input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
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
            {password && (
              <div className="strength-meter">
                <div 
                  className="strength-bar" 
                  style={{ 
                    width: `${strengthWidth}%`, 
                    backgroundColor: strengthColor[strength] 
                  }} 
                />
              </div>
            )}
            <div style={{ fontSize: '0.8rem', color: '#718096', marginTop: '5px' }}>
              Must contain uppercase, number, and special character.
            </div>
          </div>
          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="spinner" size={20} />
                Creating Account...
              </>
            ) : 'Sign Up'}
          </button>
        </form>

        <div className="separator">Or sign up with</div>

        <button type="button" className="google-btn" onClick={handleGoogleSignup}>
          <svg style={{ width: '18px', height: '18px', marginRight: '10px' }} viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign up with Google
        </button>

        <div className="auth-footer">
          Already have an account? 
          <Link to="/" className="auth-link">Log in</Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;