import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { setSession, clearSession } from 'src/utils/authUtils';

import { useAuth } from 'src/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from '@/routes/hooks';
import { apiMiddleware } from '@/middleware/apiMiddleware';

const OAuthCallback = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const location = useLocation();
  const navigate = useNavigate();
  const router = useRouter();
  const { toast } = useToast();
  const { setIsAuthenticated } = useAuth();
  useEffect(() => {
    const exchangeCodeForToken = async () => {
      const code = new URLSearchParams(location.search).get('code');
      if (!code) {
        console.error('Authorization code not found.');
        toast({
          title: 'Error',
          description: 'Authorization code not found',
          variant: 'destructive',
        });
        router.push('/signup', { replace: true });
        return;
      }
      try {
        const response = await apiMiddleware(`api/google_login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          console.error('Failed to exchange code for token.');
          toast({
            title: 'Error',
            description: 'Failed to exchange code for token',
            variant: 'destructive',
          });
          clearSession(); // Ensure session is clear on failure
          router.push('/signup', { replace: true });
          return;
        }
        const data = await response.json();
        toast({
          title: 'Success',
          description: 'Successfully logged in. Welcome to The Timeless Tutor!',
          variant: 'success',
        });
        // Save the session details using setSession
        setSession({
          access_token: data.data.access_token,
          refresh_token: data.data.refresh_token,
          access_token_expiry: data.data.access_token_expiry,
          refresh_token_expiry: data.data.refresh_token_expiry,
        });
        setIsAuthenticated(true); // Set isAuthenticated to true on successful login
        router.push('/'); // Navigate to a welcome or dashboard page
      } catch (error) {
        console.error('Error exchanging code for token:', error);
        clearSession(); // Ensure session is clear on error
        router.push('/signup', { replace: true });
      }
    };
    exchangeCodeForToken();
  }, [location, navigate, backendUrl, setIsAuthenticated, router, toast]);
  return <div>Processing OAuth callback. Please wait...</div>;
};
export default OAuthCallback;
