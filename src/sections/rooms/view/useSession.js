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
    mutationFn: (credentials) => sessionApi(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(['sessions'], data);
      //   setSession(data);
      router.push('/', { replace: true });
      toast({
        description: 'You have successfully created a session.'
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to create session. Please try again.',
        variant: 'destructive'
      });
    }
  });

  return { session, isLoading };
}
