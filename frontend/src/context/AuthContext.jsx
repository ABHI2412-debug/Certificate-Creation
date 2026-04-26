import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token with backend and get user data
      axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setUser(res.data);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.error('Token validation failed:', error);
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = (userData) => {
    console.log("Login called with:", userData);
    setUser(userData);
    setIsAuthenticated(true);
    if (userData?.token) {
      localStorage.setItem('token', userData.token);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser: setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};