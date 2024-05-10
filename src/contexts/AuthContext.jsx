import React, { useMemo, useState, useEffect, useContext, createContext } from 'react';

import { useIsAuthenticated } from '@/sections/login/useIsAuthenticated';
import { useGetUser } from 'src/sections/login/useGetUser';

import { clearSession } from '../utils/authUtils';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const { user, isLoading: userLoading } = useGetUser();
  const { isAuthenticated, isLoading: authLoading } = useIsAuthenticated();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);

  // initialially check if user is authenticated
  useEffect(() => {
    setIsLoggedIn(isAuthenticated);
  }, [isAuthenticated]);

  // logout function
  const logout = () => {
    clearSession();
    setIsLoggedIn(false);
  };

  const setIsAuthenticated = (value) => {
    setIsLoggedIn(value);
  };

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated: isLoggedIn,
      isLoading: userLoading || authLoading,
      logout,
      setIsAuthenticated,
    }),
    [user, isLoggedIn, userLoading, authLoading]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { useAuth, AuthProvider };
