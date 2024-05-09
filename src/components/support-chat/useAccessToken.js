import { useQuery } from '@tanstack/react-query';

import { getAccessToken as getAccessTokenApi } from './apiSalesforce';

export function useAccessToken() {
  const { isLoading, data: accessToken } = useQuery({
    queryKey: ['accessToken'],
    queryFn: getAccessTokenApi,
  });

  return { accessToken, isLoading };
}
