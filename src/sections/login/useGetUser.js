import { useQuery } from '@tanstack/react-query';

import { getUser as getUserApi } from './apiAuth';

export function useGetUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getUserApi,
  });

  return { user, isLoading };
}
