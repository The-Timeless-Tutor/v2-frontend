import { backendUrl } from 'src/utils/constant';

import { apiMiddleware } from 'src/middleware/apiMiddleware';
import { setSession } from 'src/utils/authUtils';

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
export const loginWithEmail = async (email, password) => {
  try {
    console.log('loginWithEmail', backendUrl, email, password);
    const response = await fetch(`${backendUrl}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: email, password }),
    });
    console.log('It workds here.....');
    const data = await response.json();
    console.log('Successfully logged in', data.data);

    if (!response.ok) {
      throw new Error(data.message);
    }

    setSession(data.data);

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
