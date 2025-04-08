import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user, token } = useAuth();
  
  useEffect(() => {
    console.log('ProtectedRoute evaluation:', {
      isAuthenticated,
      hasUser: !!user,
      hasToken: !!token,
      userEmail: user?.email || 'none'
    });
  }, [isAuthenticated, user, token]);

  if (!isAuthenticated) {
    console.log('Access denied: Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  console.log('Access granted: User is authenticated');
  return <>{children}</>;
};

export default ProtectedRoute; 