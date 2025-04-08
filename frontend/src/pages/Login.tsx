import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [uid, setUid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Check authentication status and redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      console.log('Login: User is already authenticated, redirecting to dashboard');
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Handle redirect after successful login
  useEffect(() => {
    if (loginSuccess && isAuthenticated) {
      console.log('Login: Login successful, redirecting to dashboard');
      navigate('/dashboard', { replace: true });
    }
  }, [loginSuccess, isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', { uid, password });
    setIsLoading(true);
    setError('');

    try {
      // For testing purposes, we'll use a mock successful login
      const mockUser = {
        id: '1',
        email: uid,
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockToken = 'mock-jwt-token';

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Login successful, user:', mockUser);
      login(mockUser, mockToken);
      
      console.log('Login: Auth state updated, setting login success flag');
      setLoginSuccess(true);
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(180deg, #F4F7FE 0%, #FFFFFF 100%)'
      }}
    >
      <div 
        className="card border-0 shadow-sm"
        style={{ 
          width: '400px',
          backgroundColor: 'white',
          borderRadius: '20px'
        }}
      >
        <div className="card-body p-5">
          <h1 
            className="text-center mb-4"
            style={{ 
              fontSize: '28px',
              fontWeight: '600',
              color: '#2B3674',
              marginBottom: '32px'
            }}
          >
            Welcome back!
          </h1>
          {error && (
            <div 
              className="alert mb-4"
              style={{
                backgroundColor: '#FFF1F1',
                color: '#E31A1A',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px'
              }}
            >
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="UID"
                value={uid}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setUid(e.target.value)}
                required
                style={{ 
                  height: '52px',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  padding: '0 24px',
                  fontSize: '14px',
                  backgroundColor: '#F4F7FE',
                  transition: 'all 0.2s ease-in-out'
                }}
              />
            </div>
            <div className="mb-5">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
                style={{ 
                  height: '52px',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  padding: '0 24px',
                  fontSize: '14px',
                  backgroundColor: '#F4F7FE',
                  transition: 'all 0.2s ease-in-out'
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 mb-4"
              disabled={isLoading}
              style={{ 
                height: '52px',
                backgroundColor: '#2B3674',
                border: 'none',
                borderRadius: '16px',
                fontSize: '14px',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(43, 54, 116, 0.15)',
                transition: 'all 0.2s ease-in-out'
              }}
            >
              {isLoading ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              ) : 'Login'}
            </button>
          </form>
          <div className="text-center">
            <Link 
              to="/register" 
              className="text-decoration-none"
              style={{ 
                color: '#2B3674',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'color 0.2s ease-in-out'
              }}
            >
              Don't have an account? Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 