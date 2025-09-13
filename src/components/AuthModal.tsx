import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useModal } from '../contexts/ModalContext';

const AuthModal: React.FC = () => {
  const { isModalOpen, modalType, closeModal, openModal } = useModal();
  const { login, signup } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    repeatPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      if (modalType === 'login') {
        await login(formData.email, formData.password);
      } else if (modalType === 'signup') {
        await signup(formData.email, formData.password, formData.repeatPassword);
      }
      closeModal();
      setFormData({ email: '', password: '', repeatPassword: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const switchModal = () => {
    setFormData({ email: '', password: '', repeatPassword: '' });
    setError('');
    const newType = modalType === 'login' ? 'signup' : 'login';
    openModal(newType);
  };

  if (!isModalOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="modal-title">
            {modalType === 'login' ? 'Sign in to continue' : 'Create an account to continue'}
          </h2>
          <p className="modal-subtitle">
            {modalType === 'login' 
              ? 'Sign in to access all the features on this app'
              : 'Create an account to access all the features on this app'
            }
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          <div className="form-group">
            <label className="form-label">
              Email or username
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email or username"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="form-input"
              required
            />
          </div>
          {modalType === 'signup' && (
            <div className="form-group">
              <label className="form-label">
                Repeat password
              </label>
              <input
                type="password"
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleInputChange}
                placeholder="Enter your password again"
                className="form-input"
                required
              />
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? 'Loading...' : (modalType === 'login' ? 'Sign In' : 'Sign Up')}
          </button>
        </form>
        <div className="modal-footer">
          <p>
            {modalType === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={switchModal}
              className="modal-footer a"
              type="button"
            >
              {modalType === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
        <button
          onClick={closeModal}
          className="close-button"
          type="button"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AuthModal; 