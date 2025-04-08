import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerSchema } from '../utils/schemas';
import { useZodForm } from '../hooks/useZodForm';
import { useAuth } from '../context/AuthContext';
import { register as registerApi } from '../api/authApi';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm(registerSchema);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      setError('');
      const response = await registerApi(data);
      login(response.user, response.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = {
    height: '52px',
    borderRadius: '16px',
    border: '1px solid #E2E8F0',
    padding: '0 24px',
    fontSize: '14px',
    backgroundColor: '#F4F7FE',
    transition: 'all 0.2s ease-in-out'
  };

  const errorMessageStyle = {
    color: '#E31A1A',
    fontSize: '12px',
    marginTop: '6px',
    marginLeft: '12px'
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
            Create Account
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Full Name"
                {...register('name')}
                style={inputStyle}
              />
              {errors.name?.message && (
                <div style={errorMessageStyle}>{errors.name?.message}</div>
              )}
            </div>
            <div className="mb-4">
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Email Address"
                {...register('email')}
                style={inputStyle}
              />
              {errors.email?.message && (
                <div style={errorMessageStyle}>{errors.email?.message}</div>
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Password"
                {...register('password')}
                style={inputStyle}
              />
              {errors.password?.message && (
                <div style={errorMessageStyle}>{errors.password?.message}</div>
              )}
            </div>
            <div className="mb-5">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Confirm Password"
                {...register('confirmPassword')}
                style={inputStyle}
              />
              {errors.confirmPassword?.message && (
                <div style={errorMessageStyle}>{errors.confirmPassword?.message}</div>
              )}
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
              ) : 'Create Account'}
            </button>
          </form>
          <div className="text-center">
            <Link 
              to="/login" 
              className="text-decoration-none"
              style={{ 
                color: '#2B3674',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'color 0.2s ease-in-out'
              }}
            >
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 