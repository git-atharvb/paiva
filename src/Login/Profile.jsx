import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Bell, Sun, Moon, Save, Loader2, Mail, AlertCircle, CheckCircle, Calendar, Phone, MapPin, Users } from 'lucide-react';
import Layout from './Layout';
import './Login.css';

function Profile({ theme, toggleTheme }) {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      // Fetch user details from MongoDB Backend
      fetch(`http://localhost:5000/api/profile/${user.id}`)
        .then(res => res.json())
        .then(data => {
          setDisplayName(data.displayName || '');
          setEmail(data.email || '');
        
            setGender(data.gender || '');
            setDob(data.dob || '');
            setPhoneNumber(data.phoneNumber || '');
            setAddress(data.address || '');
        })
        .catch(err => console.error("Error fetching profile:", err));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    const userData = localStorage.getItem('user');
    if (!userData) {
      setMessage({ type: 'error', text: 'You must be logged in to save changes.' });
      return;
    }
    const user = JSON.parse(userData);

    // Validation
    if (phoneNumber) {
      const phoneDigits = phoneNumber.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        setMessage({ type: 'error', text: 'Please enter a valid phone number (at least 10 digits).' });
        return;
      }
    }

    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      if (birthDate > today) {
        setMessage({ type: 'error', text: 'Date of birth cannot be in the future.' });
        return;
      }
    }

    setIsSaving(true);

    try {
        // Update MongoDB Backend
        const profileData = {
          displayName,
          email,
          gender,
          dob,
          phoneNumber,
          address
        };

        const response = await fetch(`http://localhost:5000/api/profile/${user.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profileData),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Server error: ${response.status}`);
        }

        setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      console.error("Profile save error:", error);
      setMessage({ type: 'error', text: `Failed to update profile: ${error.message}` });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Layout>
      <header className="header">
        <h1 style={{ fontSize: '1.8rem', fontWeight: '700', margin: 0 }}>Profile</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <Bell size={24} color="#94a3b8" />
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <User size={20} />
          </div>
        </div>
      </header>

      <motion.div 
        className="stat-grid"
        style={{ display: 'block', maxWidth: '600px' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-card" style={{ margin: 0, width: '100%', maxWidth: '100%' }}>
          <h2 className="auth-title" style={{ textAlign: 'left' }}>Edit Profile</h2>
          
          {message.text && (
            <div className={message.type === 'error' ? "error-message" : "success-message"} style={{ padding: '10px', marginBottom: '1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', background: message.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)', color: message.type === 'error' ? '#ef4444' : '#22c55e' }}>
              {message.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
              {message.text}
            </div>
          )}

          <form onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label">Display Name</label>
              <div className="input-wrapper">
                <User className="input-icon" size={20} />
                <input
                  className="form-input"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <div className="input-wrapper">
                <Users className="input-icon" size={20} />
                <select
                  className="form-input"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  style={{ appearance: 'none', cursor: 'pointer' }}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <div className="input-wrapper">
                <Calendar className="input-icon" size={20} />
                <input
                  className="form-input"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div className="input-wrapper">
                <Phone className="input-icon" size={20} />
                <input
                  className="form-input"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Address</label>
              <div className="input-wrapper">
                <MapPin className="input-icon" size={20} />
                <input
                  className="form-input"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main St, City, Country"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input
                  className="form-input"
                  type="email"
                  value={email}
                  disabled
                  style={{ opacity: 0.7, cursor: 'not-allowed' }}
                />
              </div>
              <div style={{ fontSize: '0.8rem', color: '#718096', marginTop: '5px' }}>
                Email cannot be changed.
              </div>
            </div>

            <button type="submit" className="auth-button" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="spinner" size={20} />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={20} style={{ marginRight: '8px' }} />
                  Save Changes
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </Layout>
  );
}

export default Profile;