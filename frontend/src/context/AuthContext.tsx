import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    console.log('AuthProvider: Loading auth state from localStorage');
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    console.log('AuthProvider: Found stored data:', { 
      hasUser: !!storedUser,
      hasToken: !!storedToken 
    });
    
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('AuthProvider: Successfully parsed user data:', parsedUser.email);
        setUser(parsedUser);
        setToken(storedToken);
      } catch (error) {
        // Handle parsing error
        console.error('AuthProvider: Failed to parse stored user data', error);
        // Clear invalid storage data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (user: User, token: string) => {
    console.log('AuthProvider: Setting user and token in state and localStorage', user.email);
    setUser(user);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const logout = () => {
    console.log('AuthProvider: Clearing user session');
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const isAuthenticated = !!user && !!token;
  
  console.log('AuthProvider: Current auth state:', { 
    isAuthenticated, 
    hasUser: !!user,
    hasToken: !!token
  });

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 