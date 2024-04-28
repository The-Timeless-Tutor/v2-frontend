import React, { createContext, useContext, useState, useReducer } from 'react';
import { apiMiddleware } from 'src/middleware/apiMiddleware';

const AuthContext = createContext(null);

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'login': {
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    }
    case 'logout': {
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    }
    default:
      throw new Error('Unknown action type');
  }
}

// TODO: use react-query to call backend for session management
const fetchUser = async () => {
  try {
    const response = await apiMiddleware(`api/user`);
    if (!response.ok) {
      //  const errorData = await response.json();
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    console.log('data after login', data);
    return {
      email: data.data.email,
      username: data.data.username,
      verifiedAt: data.data.verified_at,
      id: data.data.id,
    };
  } catch (error) {
    throw new Error(error.toString());
  }
};

export const AuthProvider = ({ children }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

  const signIn = async (data) => {
    // Perform authentication and store the received token
    // Assuming data includes the tokens and user details
    setUser(data);
    // Set session might manage localStorage or cookies as per requirement
    setSession(data);
  };

  const signOut = () => {
    // Clear user session and user state
    setUser(null);
    clearSession();
  };

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
