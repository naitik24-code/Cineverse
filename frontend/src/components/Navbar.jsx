import React from 'react';
import Button from './Button';
import './Navbar.css';

const Navbar = ({ activeTab, onTabChange, userName = "Naitik Pathak", userRole = "User", onLogout }) => {
  return (
    <header className="cv-navbar glass">
      <div className="cv-navbar-logo" onClick={() => onTabChange('dashboard')}>
        <span className="cv-logo-emoji">🍿</span>
        <span className="cv-logo-text gradient-text">Cineverse</span>
      </div>

      <nav className="cv-navbar-links">
        <button
          type="button"
          className={`cv-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => onTabChange('dashboard')}
        >
          Dashboard
        </button>
        {userRole === 'User' ? (
          <button
            type="button"
            className={`cv-nav-item ${activeTab === 'booking' ? 'active' : ''}`}
            onClick={() => onTabChange('booking')}
          >
            Book Tickets
          </button>
        ) : (
          <button
            type="button"
            className={`cv-nav-item ${activeTab === 'seat-mgmt' ? 'active' : ''}`}
            onClick={() => onTabChange('seat-mgmt')}
          >
            Seat Config
          </button>
        )}
      </nav>

      <div className="cv-navbar-user">
        <div className="cv-user-avatar">
          {userName.charAt(0).toUpperCase()}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span className="cv-user-name">{userName}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '600' }}>{userRole}</span>
        </div>
        <Button
          variant="outline"
          onClick={onLogout}
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', marginLeft: '0.5rem' }}
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Navbar;

