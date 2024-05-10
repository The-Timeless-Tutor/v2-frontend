import { apiMiddleware } from '@/middleware/apiMiddleware';

const fetchMessage = async (room, lastMessageId = null) => {
  console.log('Room being fetched: ', room);

  const url = lastMessageId
    ? `api/room/rooms/${room}/messages/?last_message_id=${lastMessageId}&limit=50`
    : `api/room/rooms/${room}/messages/?limit=50`;

  const token = sessionStorage.getItem('accessToken');

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
  console.log(data);
  return data;
};

export default fetchMessage;
