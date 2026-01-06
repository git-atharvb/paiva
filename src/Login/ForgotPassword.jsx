import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';
import { auth } from '../firebase';
import './Login.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    try {
      await Promise.all([
        sendPasswordResetEmail(auth, email),
        new Promise(resolve => setTimeout(resolve, 2000))
      ]);
      setIsSubmitted(true);
    } catch (error) {
      let msg = "Failed to send reset email.";
      if (error.code === 'auth/user-not-found') msg = "No account found with this email.";
      if (error.code === 'auth/invalid-email') msg = "Invalid email address.";
      setErrorMessage(msg);
    } finally {
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
        <h2 className="auth-title">Reset password</h2>
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className="auth-subtitle">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            {errorMessage && (
              <div className="error-message">
                <AlertCircle size={16} />
                {errorMessage}
              </div>
            )}
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
            <button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="spinner" size={20} />
                  Sending Link...
                </>
              ) : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✉️</div>
            <h3 style={{ color: '#2d3748', marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: 700 }}>Check your email</h3>
            <p className="auth-subtitle" style={{ marginBottom: '2rem' }}>
              We have sent a password reset link to <strong>{email}</strong>.
            </p>
            <button 
              className="auth-button" 
              onClick={() => setIsSubmitted(false)}
              style={{ background: 'transparent', border: '2px solid #e2e8f0', color: '#4a5568', boxShadow: 'none' }}
            >
              Try another email
            </button>
          </div>
        )}
        <br />
        <div className="auth-footer">
          <Link to="/" className="auth-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;