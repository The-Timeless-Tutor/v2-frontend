import React, { useMemo, useState, useEffect, useContext, createContext } from 'react';

import { getUserDetails } from 'src/sections/login/apiLogin';

import { getSession, refreshTokens, isTokenExpired, clearSession } from '../utils/authUtils';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || 'https://backend-service-rojjrgeqna-ue.a.run.app/';
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize isAuthenticated based on local storage to persist login state
    const sessionData = getSession();
    return sessionData ? !isTokenExpired(sessionData.accessTokenExpiry) : false;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    async function authenticate() {
      const session = getSession();
      if (!session || isTokenExpired(session.accessTokenExpiry)) {
        console.log('No session or token expired, needs re-authentication');
        setIsAuthenticated(false);
        setError('Session expired or no valid session');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${backendUrl}api/is_authenticated`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        if (!isMounted) return;

        if (response.ok) {
          const data = await response.json();
          console.log('Authentication successful', data);
          setIsAuthenticated(true);
        } else if (response.status === 401) {
          if (isTokenExpired(session.accessTokenExpiry)) {
            console.log('Token expired, attempting to refresh');
            const refreshSuccess = await refreshTokens(backendUrl);
            if (refreshSuccess) {
              authenticate(); // Recursively re-authenticate with the new token
            } else {
              setIsAuthenticated(false);
              setError('Token refresh failed. Please log in again.');
            }
          }
        } else {
          console.error('Authentication failed with response:', response.status);
          setIsAuthenticated(false);
          throw new Error(`Authentication failed with status ${response.status}`);
        }
      } catch (err) {
        console.error('Error during authentication:', err);
        setIsAuthenticated(false);
        setError(err.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    authenticate();

    // get user details
    const fetchUserDetails = async () => {
      const userDetails = await getUserDetails();
      setUser(userDetails.data);
    };

    fetchUserDetails();

    return () => {
      isMounted = false;
    };
  }, [backendUrl]);

  const logout = () => {
    setIsLoading(true);
    clearSession();
    setIsAuthenticated(false);
    setUser(null);
    setError(null);
    setIsLoading(false);
  };

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      error,
      logout,
      setIsAuthenticated,
    }),
    [user, isAuthenticated, isLoading, error]
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

export { AuthProvider, useAuth };
