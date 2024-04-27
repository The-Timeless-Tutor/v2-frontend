// Checks if a token is expired based on the provided expiry time
export const isTokenExpired = (expiryTime) => {
  const now = new Date();
  const expiryDate = new Date(expiryTime);
  return now >= expiryDate; // True if current time is past the expiry time
};

// Sets user session data in sessionStorage
export const setSession = (data) => {
  sessionStorage.setItem('accessToken', data.access_token);
  sessionStorage.setItem('refreshToken', data.refresh_token);
  sessionStorage.setItem('accessTokenExpiry', data.access_token_expiry);
  sessionStorage.setItem('refreshTokenExpiry', data.refresh_token_expiry);
};

// Clears all user session data from sessionStorage
export const clearSession = () => {
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
  sessionStorage.removeItem('accessTokenExpiry');
  sessionStorage.removeItem('refreshTokenExpiry');
};

// Retrieves current user session data from sessionStorage
export const getSession = () => ({
  accessToken: sessionStorage.getItem('accessToken'),
  refreshToken: sessionStorage.getItem('refreshToken'),
  accessTokenExpiry: sessionStorage.getItem('accessTokenExpiry'),
  refreshTokenExpiry: sessionStorage.getItem('refreshTokenExpiry'),
});

// Attempts to refresh the access token using the refresh token
export const refreshToken = async (backendUrl) => {
  const { refreshToken, refreshTokenExpiry } = getSession();

  // Check if the refresh token is valid
  if (!refreshToken || new Date() >= new Date(refreshTokenExpiry)) {
      clearSession();
      throw new Error('Refresh token is expired or not available. Please log in again.');
  }

  try {
      const response = await fetch(`${backendUrl}api/token_refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) {
          throw new Error('Failed to refresh access token');
      }

      const data = await response.json();

      setSession({
          access_token: data.data.access_token,
          refresh_token: data.data.refresh_token, // Use new refresh token if provided
          access_token_expiry: data.data.access_token_expiry,
          refresh_token_expiry: data.data.refresh_token_expiry || refreshTokenExpiry, // Use existing expiry if new one isn't provided
      });

      return data.data.access_token; // Return the new access token
  } catch (error) {
      console.error('Error refreshing token:', error);
      clearSession(); // Clear session on failure
      throw error; // Re-throw the error for handling elsewhere
  }
};
