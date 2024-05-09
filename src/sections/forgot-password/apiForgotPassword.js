import { apiMiddleware } from '@/middleware/apiMiddleware';

export const forgotPassword = async (email) => {
  try {
    const response = await apiMiddleware(`api/forgot_password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!data.status) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
