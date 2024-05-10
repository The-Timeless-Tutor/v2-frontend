import { useInfiniteQuery } from '@tanstack/react-query';
import fetchMessage from '@/api/message';

const useMessage = (room) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['messages', room],
    queryFn: ({ pageParam = null }) => fetchMessage(room, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.length === 0) return undefined;
      return lastPage[lastPage.length - 1].id;
    }
  });

  return {
    messages: data?.pages?.flat() || [],
    prependMessages: fetchNextPage,
    isLoading,
    isError,
    hasMoreMessages: hasNextPage
  };
};

export default useMessage;
