import { apiMiddleware } from '@/middleware/apiMiddleware';

const fetchUser = async () => {
  try {
    const response = await apiMiddleware(`api/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
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

export default fetchUser;
