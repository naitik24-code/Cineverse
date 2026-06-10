import React, { useState } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import './AuthPage.css';

const AuthPage = ({ onLoginSuccess, onCancel }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('Naitik Pathak');
  const [password, setPassword] = useState('123456');
  const [role, setRole] = useState('User'); // 'User', 'Theatre Owner', 'Admin'
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters.');
      return;
    }

    if (password.length < 5) {
      setError('Password must be at least 5 characters.');
      return;
    }

    // Pass successful login details back to App context
    onLoginSuccess(username, role);
  };

  return (
    <div className="cv-auth-container">
      <Card className="cv-auth-card" hoverEffect={false}>
        {/* Back Link */}
        <button type="button" className="cv-auth-back" onClick={onCancel}>
          &larr; Back to Landing Page
        </button>

        <div className="cv-auth-header">
          <span className="cv-auth-logo-icon">🍿</span>
          <h2 className="cv-auth-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="cv-auth-subtitle">
            {isLogin ? 'Sign in to access your cinematic dashboard' : 'Join Cineverse to explore and book tickets'}
          </p>
        </div>

        {error && <div className="cv-auth-error-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="cv-auth-form">
          <Input
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
            icon="👤"
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            icon="🔒"
          />

          {/* Role selector - Crucial for RBAC assessment */}
          <div className="cv-auth-form-group">
            <label className="cv-auth-label">Select Account Role</label>
            <select
              className="cv-auth-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="User">Moviegoer (User)</option>
              <option value="Theatre Owner">Theatre Owner</option>
              <option value="Admin">System Administrator (Admin)</option>
            </select>
          </div>

          <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '1rem' }}>
            {isLogin ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>

        <div className="cv-auth-toggle">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button type="button" className="cv-toggle-btn" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>

        {/* Info Box detailing student credentials for SWC Assessment */}
        <div className="cv-auth-info-box glass-card">
          <p><strong>SWC Assessment Quick Testing Creds:</strong></p>
          <ul>
            <li><strong>User</strong> role: Default is set to <em>User</em></li>
            <li><strong>Theatre Owner</strong> role: Allows adding movies, managing shows, viewing reports.</li>
            <li><strong>Admin</strong> role: Full access including managing users.</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default AuthPage;
