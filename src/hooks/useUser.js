import { useQuery } from '@tanstack/react-query';

import fetchUser from '@/api/user';

const useUser = () => {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser
  });

  return { user, isLoading };
};

export default useUser;
