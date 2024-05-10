import { useQuery } from '@tanstack/react-query';

import { getFeeds as getFeedsApi } from './apiFeeds';

export function useGetFeeds() {
  const { isLoading, data: feeds } = useQuery({
    queryKey: ['feeds'],
    queryFn: getFeedsApi,
  });

  return { feeds, isLoading };
}
