import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaCalendarAlt, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, token, logout, isAuthenticated } = useAuth();
  
  useEffect(() => {
    console.log('Dashboard mounted with auth state:', { 
      user, 
      token: token ? 'Token exists' : 'No token', 
      isAuthenticated 
    });
    
    if (!isAuthenticated) {
      console.log('User not authenticated, redirecting to login...');
    }
  }, [user, token, isAuthenticated]);

  const handleLogout = () => {
    console.log('Logging out user:', user?.email);
    logout();
    navigate('/login');
  };

  // Helper function to render icons using React.createElement
  const renderIcon = (Icon: any, props: any = {}) => {
    return React.createElement(Icon, { size: 20, ...props });
  };

  return (
    <div 
      className="min-vh-100"
      style={{
        background: 'linear-gradient(180deg, #F4F7FE 0%, #FFFFFF 100%)',
        padding: '2rem'
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div 
              className="card border-0 shadow-sm"
              style={{ 
                borderRadius: '20px',
                overflow: 'hidden'
              }}
            >
              <div 
                className="card-header border-0 py-4"
                style={{
                  background: '#2B3674',
                  color: 'white'
                }}
              >
                <div className="d-flex justify-content-between align-items-center px-4">
                  <div className="d-flex align-items-center">
                    <div 
                      className="rounded-circle bg-white p-2 me-3"
                      style={{ width: '48px', height: '48px' }}
                    >
                      {renderIcon(FaUser, { size: 24, color: '#2B3674' })}
                    </div>
                    <div>
                      <h4 className="mb-0" style={{ fontSize: '24px', fontWeight: '600' }}>
                        Welcome, {user?.name || 'User'}!
                      </h4>
                      <p className="mb-0 opacity-75" style={{ fontSize: '14px' }}>
                        Dashboard Overview
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn btn-light d-flex align-items-center"
                    style={{
                      borderRadius: '12px',
                      padding: '10px 20px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    {renderIcon(FaSignOutAlt, { className: 'me-2' })}
                    Logout
                  </button>
                </div>
              </div>
              <div className="card-body p-4">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div 
                      className="card border-0 h-100"
                      style={{
                        borderRadius: '16px',
                        backgroundColor: '#F4F7FE'
                      }}
                    >
                      <div className="card-body p-4">
                        <h5 
                          className="card-title mb-4"
                          style={{
                            color: '#2B3674',
                            fontSize: '18px',
                            fontWeight: '600'
                          }}
                        >
                          Profile Information
                        </h5>
                        <div className="d-flex align-items-center mb-3">
                          {renderIcon(FaEnvelope, { className: 'me-3', color: '#2B3674' })}
                          <div>
                            <p className="text-muted mb-0" style={{ fontSize: '12px' }}>Email Address</p>
                            <p className="mb-0" style={{ fontSize: '14px', fontWeight: '500' }}>
                              {user?.email || 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          {renderIcon(FaCalendarAlt, { className: 'me-3', color: '#2B3674' })}
                          <div>
                            <p className="text-muted mb-0" style={{ fontSize: '12px' }}>Member Since</p>
                            <p className="mb-0" style={{ fontSize: '14px', fontWeight: '500' }}>
                              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div 
                      className="card border-0 h-100"
                      style={{
                        borderRadius: '16px',
                        backgroundColor: '#F4F7FE'
                      }}
                    >
                      <div className="card-body p-4">
                        <h5 
                          className="card-title mb-4"
                          style={{
                            color: '#2B3674',
                            fontSize: '18px',
                            fontWeight: '600'
                          }}
                        >
                          Account Status
                        </h5>
                        <div className="mb-3">
                          <span 
                            className="badge"
                            style={{
                              backgroundColor: '#E8FFF3',
                              color: '#0EA65D',
                              fontSize: '12px',
                              padding: '8px 16px',
                              borderRadius: '20px'
                            }}
                          >
                            Active
                          </span>
                        </div>
                        <p 
                          className="card-text"
                          style={{
                            fontSize: '14px',
                            color: '#2B3674',
                            opacity: 0.8
                          }}
                        >
                          Your account is in good standing. All features and services are available.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 