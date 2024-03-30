import React, { createContext, useContext, useState } from 'react';
import { storage } from '../utils/storage.ts';


export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData) => {
    // Authenticate user and set user information and authentication status
    storage.setItem('accessToken', userData.accessToken);

    storage.setItem('userId', userData.userId);
    storage.setItem('userName', userData.userName);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const checkIfIsAuthenticated = () => {
    if (!storage.getItem('accessToken')) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
      const accessToken = storage.getItem('accessToken');
      const userId = storage.getItem('userId');
      const userName = storage.getItem('userName');
      setUser({
        accessToken,
        userId,
        userName
      })
    }

  }

  const logout = () => {
    // Remove user information and set authentication status to false
    setUser(null);
    storage.removeItem('accessToken');
    storage.removeItem('userId');
    storage.removeItem('userName');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, checkIfIsAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};