import { useState } from 'react';
import { useForm } from 'react-hook-form';

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
import { useMediaQuery } from '@mui/material';

import { FcGoogle } from 'react-icons/fc';

import { bgGradient } from 'src/theme/css';

import { useRouter } from 'src/routes/hooks';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { WorldcoinLogo } from '@/assets/landing-assets';

import { useLogin } from './useLogin';

export default function LoginView() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const { login, isLoading } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (formData) => {
    if (!formData) return;
    login(formData);
  };

  const handleForgotPasswordClick = () => {
    router.push('/forgot-password');
  };

  const handleSignupClick = () => {
    router.push('/register');
  };

  const handleGoogleClick = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = `${window.location.origin}/oauth-callback`;
    const scope = encodeURIComponent('openid email profile');
    const responseType = 'code';
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=offline&prompt=consent`;

    window.location.href = authUrl;
  };

  const renderForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField
          type="email"
          name="email"
          label="Email address"
          {...register('email', {
            required: 'Email is required'
          })}
          error={!!errors.email}
          helperText={errors?.email?.message}
          disabled={isLoading}
        />

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
            )
          }}
          {...register('password', {
            required: 'Password is required'
          })}
          error={!!errors.password}
          helperText={errors?.password?.message}
          disabled={isLoading}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link
          variant="subtitle2"
          underline="hover"
          sx={{ ml: 0.5, cursor: 'pointer' }}
          onClick={handleForgotPasswordClick}
        >
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        loading={isLoading}
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
          imgUrl: '/assets/background/overlay_4.jpg'
        }),
        height: 1
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 }
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 700
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
              sx={{
                borderColor: alpha(theme.palette.grey[500], 0.16),
                transition: 'all 0.3s ease-in-out',
                ':hover': {
                  transform: 'scale(1.05)'
                }
              }}
              onClick={handleGoogleClick}
            >
              <FcGoogle size={40} />
              {mdUp && <Typography sx={{ ml: 1 }}>Sign in with Google</Typography>}
            </Button>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{
                borderColor: alpha(theme.palette.grey[500], 0.16),
                backgroundColor: '#221d1d',
                color: '#fff',
                width: '50',
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease-in-out',
                ':hover': {
                  color: '#fff',
                  backgroundColor: '#221d1d',
                  transform: 'scale(1.05)'
                }
              }}
            >
              <img src={WorldcoinLogo} alt="Worldcoin Logo" style={{ width: 60, height: 60 }} />
              {mdUp && (
                <Typography sx={{ ml: 1, whiteSpace: 'nowrap' }}>Sign in with Worldcoin</Typography>
              )}
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
