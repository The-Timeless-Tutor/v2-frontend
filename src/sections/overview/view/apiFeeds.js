import { apiMiddleware } from 'src/middleware/apiMiddleware';

export const getFeeds = async () => {
  try {
    const response = await apiMiddleware(`api/blog/feed_data`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
