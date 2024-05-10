import { useQuery } from '@tanstack/react-query';
import fetchRoom from '@/api/room';

const useRoom = (email) => {
  const {
    isLoading,
    data: room,
    error
  } = useQuery({
    queryKey: ['room', email],
    queryFn: () => fetchRoom(email),
    enabled: !!email
  });

  return { room, isLoading, error };
};

export default useRoom;
