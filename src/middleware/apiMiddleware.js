import { getSession, refreshTokens, isTokenExpired } from '../utils/authUtils';

export const apiMiddleware = async (endpoint, options = {}) => {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || 'https://backend-service-rojjrgeqna-ue.a.run.app/';
  const url = new URL(endpoint, backendUrl);

  // Ensure options.headers is an object
  options.headers = options.headers || {};

  // Append query parameters if present
  if (options.params) {
    Object.keys(options.params).forEach((key) => url.searchParams.append(key, options.params[key]));
  }

  // Handle token in headers
  const session = getSession();
  if (session.accessToken && isTokenExpired(session.accessTokenExpiry)) {
    const success = await refreshAccessToken(backendUrl);
    if (!success) throw new Error('Failed to refresh token. Please log in again.');
  }

  // Set Authorization header if access token is valid
  if (session.accessToken) {
    options.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  // Execute the request
  let response = await fetch(url, options);

  // Retry once if the first attempt fails due to an expired token
  if (response.status === 401) {
    const success = await refreshAccessToken(backendUrl);
    if (!success) {
      throw new Error('Failed to refresh token on retry. Please log in again.');
    }

    // Refresh the session details after successful token refresh
    const newSession = getSession();
    options.headers.Authorization = `Bearer ${newSession.accessToken}`;
    // Retry the fetch with the new token
    response = await fetch(url, options);
  }

  return response;
};

async function refreshAccessToken(backendUrl) {
  try {
    // Assume refreshToken returns true on success
    return await refreshTokens(backendUrl);
  } catch (error) {
    // console.error('Error refreshing token:', error);
    return false;
  }
}
