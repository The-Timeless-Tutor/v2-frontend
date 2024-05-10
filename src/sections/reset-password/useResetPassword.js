import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'src/routes/hooks';

import { useToast } from '@/components/ui/use-toast';

import { resetPassword as resetPasswordApi } from './apiResetPassword';

export function useResetPassword() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  const { mutate: resetPassword, isLoading } = useMutation({
    mutationFn: (credentials) => resetPasswordApi(credentials.token, credentials.password),
    onSuccess: (response) => {
      queryClient.setQueryData(['response'], response);
      router.push('/login', { replace: true });
      toast({
        description: 'New password set successfully. You can now login with your new password.'
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (err) => {
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive'
      });
    }
  });

  return { resetPassword, isLoading };
}
