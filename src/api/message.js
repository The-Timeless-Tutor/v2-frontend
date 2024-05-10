import { apiMiddleware } from '@/middleware/apiMiddleware';

const fetchMessage = async (room, lastMessageId = null) => {
  const token = sessionStorage.getItem('accessToken');
  const url = lastMessageId
    ? `api/room/rooms/${room}/messages/?last_message_id=${lastMessageId}&limit=50`
    : `api/room/rooms/test/messages/?limit=50`;

  const response = await apiMiddleware(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return response.json();
};

export default fetchMessage;
