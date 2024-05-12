import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'src/routes/hooks';
import { session as sessionApi } from '../../../api/sessions';
import { setSession } from '@/utils/authUtils';
import { useToast } from '@/components/ui/use-toast';

export function useSession() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  const { mutate: session, isLoading } = useMutation({
    mutationFn: (credentials) => sessionApi(credentials.email, credentials.password),
    onSuccess: (data) => {
      queryClient.setQueryData(['sessions'], data);
      //   setSession(data);
      router.push('/', { replace: true });
      toast({
        description: 'You have successfully logged in. Welcome to The Timeless Tutor!'
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Invalid email or password! Please try again.',
        variant: 'destructive'
      });
    }
  });

  return { session, isLoading };
}
