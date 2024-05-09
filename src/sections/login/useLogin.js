import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'src/routes/hooks';
import { login as loginApi } from './apiAuth';
import { setSession } from '@/utils/authUtils';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();
  const { setIsAuthenticated, isLoading: isAuthLoading } = useAuth();

  const { mutate: login, isLoading: isLoginLoading } = useMutation({
    mutationFn: (credentials) => loginApi(credentials.email, credentials.password),
    onSuccess: (data) => {
      queryClient.setQueryData(['data'], data);
      setSession(data);
      setIsAuthenticated(true);
      router.push('/', { replace: true });
      toast({
        description: 'You have successfully logged in. Welcome to The Timeless Tutor!',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Invalid email or password! Please try again.',
        variant: 'destructive',
      });
    },
  });

  return { login, isLoading: isLoginLoading || isAuthLoading };
}
