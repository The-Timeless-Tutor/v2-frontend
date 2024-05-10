import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'src/routes/hooks';
import { register as registerApi } from './apiRegister';
import { setSession } from '@/utils/authUtils';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export function useRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();
  const { setIsAuthenticated, isLoading: isAuthLoading } = useAuth();

  const { mutate: registerUser, isLoading: isRegisterLoading } = useMutation({
    mutationFn: (credentials) => registerApi(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(['registerData'], data);
      setSession(data);
      setIsAuthenticated(true);
      router.push('/', { replace: true });
      toast({
        description: 'You have successfully registered. Welcome to The Timeless Tutor!'
      });
    },
    onError: (err) => {
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive'
      });
    }
  });

  return { registerUser, isLoading: isRegisterLoading || isAuthLoading };
}
