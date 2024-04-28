import { Navigate } from 'react-router-dom';

import { backendUrl } from 'src/utils/constant';
import { getSession, setSession } from 'src/utils/authUtils';

import { apiMiddleware } from 'src/middleware/apiMiddleware';
import { toast } from 'react-toastify';

// Login with google
export const initiateOAuthFlow = (e) => {
  e.preventDefault();
  const clientId = '38848157538-gmigdespto904q75goboriiun7ingfcr.apps.googleusercontent.com';
  const redirectUri = `${window.location.origin}/oauth-callback`;
  const scope = encodeURIComponent('openid email profile');
  const responseType = 'code';
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=offline&prompt=consent`;

  // console.log("redirectUril" + redirectUri);
  // Open a new window for the Google OAuth URL
  window.location.href = authUrl;
};

// Login with email and password
export const loginWithEmail = async (email, password, setIsAuthenticated) => {
  try {
    const response = await apiMiddleware(`api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message);
      throw new Error(data.message);
    }
    // If successful, set the session & authenticate the user and redirect to app
    setSession(data.data);
    setIsAuthenticated(true);
    // redirect to app
    window.location.href = '/';
  } catch (error) {
    throw new Error(error.message);
  }
};

// get user details
export const getUserDetails = async () => {
  try {
    const response = await apiMiddleware(`api/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(data.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Check if token is valid
export const isTokenVerification = async (resetToken) => {
  try {
    const response = await apiMiddleware(`${backendUrl}/api/validate_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: resetToken }),
    });

    // return true if token is valid
    if (response.ok) {
      return true;
    }

    if (response.status === 401) {
      throw new Error('Invalid token. Please try again.');
    }
  } catch (error) {
    throw new Error(error.message);
  }

  // return false if token is invalid
  return false;
};
