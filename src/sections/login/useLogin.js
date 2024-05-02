import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'src/routes/hooks';
import { login as loginApi } from './apiAuth';
import { setSession } from '@/utils/authUtils';
import { useAuth } from '@/contexts/AuthContext';

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setIsAuthenticated, isLoading: isAuthLoading } = useAuth();

  const { mutate: login, isLoading: isLoginLoading } = useMutation({
    mutationFn: (credentials) => loginApi(credentials.email, credentials.password),
    onSuccess: (data) => {
      queryClient.setQueryData(['data'], data);
      setSession(data);
      setIsAuthenticated(true);
      router.push('/', { replace: true });
    },
  });

  return { login, isLoading: isLoginLoading || isAuthLoading };
}
