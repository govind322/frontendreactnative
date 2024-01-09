import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check AsyncStorage for a login flag
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      setIsAuthenticated(loggedIn === 'true');
    };
    
    checkLoginStatus();
  }, []);

  const login = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'true');
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);