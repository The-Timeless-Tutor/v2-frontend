import { backendUrl } from "src/utils/constant";
import { getSession, refreshTokens, isTokenExpired } from "src/utils/authUtils";
import { apiMiddleware } from "src/middleware/apiMiddleware";

// Login with email and password
export const login = async (email, password) => {
  try {
    const response = await apiMiddleware(`api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: email, password })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// get user details
export const getUser = async () => {
  try {
    const response = await apiMiddleware(`api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error(data.message);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// get if user is authenticated
export const isAuthenticated = async () => {
  const session = getSession();
  if (!session || isTokenExpired(session.accessTokenExpiry)) return false;

  // check if user is authenticated
  try {
    const response = await apiMiddleware(`api/is_authenticated`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      return true;
    }
    if (response.status === 401) {
      if (isTokenExpired(session.accessTokenExpiry)) {
        const refreshSuccess = await refreshTokens(backendUrl);
        return refreshSuccess;
      }
    } else {
      throw new Error(`Authentication failed with status ${response.status}`);
    }
    return false;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Check if token is valid
export const isTokenVerification = async (resetToken) => {
  try {
    const response = await apiMiddleware(`${backendUrl}/api/validate_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token: resetToken })
    });

    // return true if token is valid
    if (response.ok) {
      return true;
    }

    if (response.status === 401) {
      throw new Error("Invalid token. Please try again.");
    }
  } catch (error) {
    throw new Error(error.message);
  }

  // return false if token is invalid
  return false;
};
