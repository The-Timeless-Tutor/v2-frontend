import { apiMiddleware } from '@/middleware/apiMiddleware';

const fetchRoom = async (email) => {
  try {
    const response = await apiMiddleware(`api/room/user/groups`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default fetchRoom;
