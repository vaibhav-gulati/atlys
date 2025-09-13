import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useModal } from '../contexts/ModalContext';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { openModal } = useModal();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      openModal('login');
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <div className="logo-line"></div>
          </div>
          <span className="logo-text">foo-rum</span>
        </Link>
        <div>
          {isAuthenticated ? (
            <div className="user-info">
              <img 
                src={user?.avatar} 
                alt={user?.name}
                className="user-avatar"
              />
              <span className="user-name">{user?.name}</span>
              <button
                onClick={handleAuthClick}
                className="logout-button"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleAuthClick}
              className="auth-button"
            >
              <span>Login</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 