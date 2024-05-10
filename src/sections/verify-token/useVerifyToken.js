import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';

import { verifyToken as verifyTokenApi } from './apiVerifyToken';

export function useVerifyToken() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    mutate: verifyToken,
    isLoading,
    isError
  } = useMutation({
    mutationFn: (credentials) => verifyTokenApi(credentials.token),
    onSuccess: ({ status }) => {
      queryClient.setQueryData(['tokenStatus'], status);
      queryClient.invalidateQueries({ queryKey: ['tokenStatus'] });
    }
  });

  return { verifyToken, isLoading, isError };
}
