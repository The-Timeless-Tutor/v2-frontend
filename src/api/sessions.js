import { apiMiddleware } from '@/middleware/apiMiddleware';

export const session = async () => {
  try {
    const response = await apiMiddleware(`api/call/call_rooms/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(data.message);
    }

    const data = await response.json();
    console.log(data);

    return data.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSessions = async () => {
  try {
    const response = await apiMiddleware(`api/call/call_rooms/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(data.message);
    }

    const data = await response.json();
    console.log(data);

    return data.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
