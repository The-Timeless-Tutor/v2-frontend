import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'src/routes/hooks';

import { useToast } from '@/components/ui/use-toast';

import { forgotPassword as forgotPasswordApi } from './apiForgotPassword';

export function useForgotPassword() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: forgotPassword, isLoading } = useMutation({
    mutationFn: (credentials) => forgotPasswordApi(credentials.email),
    onSuccess: (forgotPasswordData) => {
      queryClient.setQueryData(['forgotPassword'], forgotPasswordData);
      router.push('/', { replace: true });
      toast({
        description:
          'Password reset link sent! Please check your email for password reset instructions',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: "We can't find a user with that email address",
        variant: 'destructive',
      });
    },
  });

  return { forgotPassword, isLoading };
}
