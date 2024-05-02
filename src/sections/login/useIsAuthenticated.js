import { useQuery } from '@tanstack/react-query';
import { isAuthenticated as isAuthenticatedApi } from './apiAuth';

export function useIsAuthenticated() {
  const { isLoading, data: isAuthenticated } = useQuery({
    queryKey: ['isAuthenticated'],
    queryFn: isAuthenticatedApi,
  });

  return { isAuthenticated, isLoading };
}
