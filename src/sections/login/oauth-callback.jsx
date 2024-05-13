import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useToast } from '@/components/ui/use-toast';
import { setSession, clearSession } from 'src/utils/authUtils';

import { useAuth } from 'src/contexts/AuthContext';
import { useRouter } from '@/routes/hooks';
import { apiMiddleware } from '@/middleware/apiMiddleware';
import FullPageSpinner from '@/components/ui/spinner';

const OAuthCallback = () => {
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const router = useRouter();
  const { toast } = useToast();
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    if (code) {
      exchangeCodeForToken(code);
    } else {
      setLoading(false);
    }
  }, [location.search]);

  const exchangeCodeForToken = async (code, retryCount = 0) => {
    try {
      const response = await apiMiddleware(`api/google_login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      });

      if (!navigator.onLine) {
        toast({
          title: 'Error',
          description:
            'You are currently offline. Please check your internet connection and try again.',
          variant: 'destructive'
        });
        clearSession();
        router.push('/signup', { replace: true });
        return;
      }

      if (response.ok) {
        const data = await response.json();
        toast({
          title: 'Success',
          description: 'Successfully logged in. Welcome to The Timeless Tutor!',
          variant: 'success'
        });
        setSession({
          access_token: data.data.access_token,
          refresh_token: data.data.refresh_token,
          access_token_expiry: data.data.access_token_expiry,
          refresh_token_expiry: data.data.refresh_token_expiry
        });
        setIsAuthenticated(true);
        router.push('/');
      } else {
        const errorData = await response.json();
        toast({
          title: 'Error',
          description: errorData.error || 'Failed to exchange code for token',
          variant: 'destructive'
        });
        clearSession();
        router.push('/signup', { replace: true });
      }
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      if (retryCount < 3) {
        console.warn('Failed to exchange code for token, retrying...');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await exchangeCodeForToken(code, retryCount + 1);
      } else {
        toast({
          title: 'Error',
          description: 'An unexpected error occurred. Please try again later.',
          variant: 'destructive'
        });
        clearSession();
        router.push('/signup', { replace: true });
      }
    }
  };

  return loading ? <FullPageSpinner /> : null;
};

export default OAuthCallback;
