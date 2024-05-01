import { useQuery } from '@tanstack/react-query';
import { getUser as getUserApi } from './apiAuth';
import { useToast } from '@/components/ui/use-toast';

export function useGetUser() {
  const { toast } = useToast();
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getUserApi,
    refetchOnWindowFocus: false,
  });

  return { user, isLoading };
}
