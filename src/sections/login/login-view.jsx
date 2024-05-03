import { useState } from 'react';
import { Form, useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { bgGradient } from 'src/theme/css';

import { useRouter } from 'src/routes/hooks';
import { useAuth } from 'src/contexts/AuthContext';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import { loginWithEmail } from './apiLogin';

export default function LoginView() {
  const theme = useTheme();
  const { setIsAuthenticated } = useAuth(); // setIsAuthenticated to set authenticated state once login is successful
  const router = useRouter();

  const initiateOAuthFlow = (e) => {
    e.preventDefault();
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = `${window.location.origin}/oauth-callback`;
    const scope = encodeURIComponent("openid email profile");
    const responseType = "code";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=offline&prompt=consent`;

    window.location.href = authUrl;
  };

  const initiateWorldcoinOAuthFlow = (e) => {
    e.preventDefault();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const redirectUri = `${window.location.origin}/worldcoin-oauth-callback`; // Adjust the redirect URI as necessary
    const authUrl = `${backendUrl}registration/signInWC?redirect_uri=${encodeURIComponent(redirectUri)}`;

    window.location.href = authUrl;
  };

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (formData) => {
    if (!formData) return;
    const { email, password } = formData;
    loginWithEmail(email, password, setIsAuthenticated);
  };

  const handleSignupClick = () => {
    router.push('/register');
  };

  const renderForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          {...register('email', {
            required: 'Email is required',
          })}
        />
        {errors.email && <p>{errors?.email?.message}</p>}

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...register('password', {
            required: 'Password is required',
          })}
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
      // onClick={handleClick}
      >
        Login
      </LoadingButton>
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 450,
          }}
        >
          <Typography variant="h4">Sign in to The Timeless Tutor</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            New user?
            <Link
              variant="subtitle2"
              sx={{ ml: 0.5, cursor: 'pointer' }}
              onClick={handleSignupClick}
            >
              Create an account
            </Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
              onClick={initiateOAuthFlow} // Call initiateOAuthFlow function here
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
              onClick={initiateWorldcoinOAuthFlow} // Call initiateOAuthFlow function here
            >
              <Iconify icon="arcticons:worldcoin" color="#1877F2" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
