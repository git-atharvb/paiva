import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import './Login.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setIsSubmitted(true);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Reset Password</h2>
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p style={{ color: '#4a5568', marginBottom: '1.5rem', textAlign: 'center' }}>
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </div>
            <button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? 'Sending Link...' : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✉️</div>
            <h3 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>Check your email</h3>
            <p style={{ color: '#718096', marginBottom: '1.5rem' }}>
              We have sent a password reset link to <strong>{email}</strong>.
            </p>
            <button 
              className="auth-button" 
              onClick={() => setIsSubmitted(false)}
              style={{ background: 'transparent', border: '1px solid #e2e8f0', color: '#4a5568' }}
            >
              Try another email
            </button>
          </div>
        )}

        <div className="auth-footer">
          <Link to="/" className="auth-link">← Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;