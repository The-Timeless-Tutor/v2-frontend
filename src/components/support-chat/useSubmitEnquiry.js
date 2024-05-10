import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'src/routes/hooks';
import { setSession } from '@/utils/authUtils';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useAccessToken } from './useAccessToken';
import { submitEnquiry as submitEnquiryApi } from './apiSalesforce';

export function useSubmitEnquiry() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { accessToken: accessTokenHook } = useAccessToken();
  const accessToken = accessTokenHook?.token?.access_token;

  const { mutate: enquiry, isLoading } = useMutation({
    mutationFn: (credentials) => submitEnquiryApi(accessToken, credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(['enquiry'], data);
      toast({
        description: 'Enquiry submitted successfully! We will get back to you shortly.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to submit enquiry. Please try again later.',
        variant: 'destructive',
      });
    },
  });

  return { enquiry, isLoading };
}
