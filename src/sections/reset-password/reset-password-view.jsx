import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import { IconButton, InputAdornment } from '@mui/material';
import Iconify from '@/components/iconify';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';

import { useResetPassword } from './useResetPassword';
import { useVerifyToken } from '../verify-token/useVerifyToken';

// ----------------------------------------------------------------------

export default function ResetPasswordView() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [tokenValid, setTokenValid] = useState(null);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors }
  } = useForm();
  const { verifyToken, isLoading: verifyTokenLoading, isError } = useVerifyToken();
  console.log('isError', isError);
  const { resetPassword, isLoading: resetPasswordLoading } = useResetPassword();

  const isLoading = verifyTokenLoading || resetPasswordLoading;

  const onSubmit = (formData) => {
    console.log(formData);
    if (!formData) return;
    const { token, password } = formData;
    // verifyToken({ token });
    resetPassword({ token, password });
  };

  // Watch for changes in the token field
  const token = watch('token');
  useEffect(() => {
    if (token && token.length === 6) {
      const verifyTokenAsync = async () => {
        try {
          verifyToken({ token });
        } catch (error) {
          console.error('Error verifying token:', error);
        }
      };
      verifyTokenAsync();
    }
  }, [token, verifyToken]);

  // console.log('tokenValid', tokenValid);

  const renderForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField
          type="text"
          autoComplete="off"
          size="large"
          name="token"
          label="Enter Token"
          {...register('token', {
            required: 'Token is required',
            minLength: { value: 6, message: 'Your Token must be 6 characters' },
            maxLength: { value: 6, message: 'Your Token must be exactly 6 characters' }
          })}
          error={!!errors.token || isError}
          helperText={errors?.token?.message || (isError ? 'Invalid token' : '')}
          disabled={isLoading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {/* Only show icons if the token length is 6 characters */}
                {token && token.length === 6 && (
                  <>
                    {isError === false && (
                      <Iconify icon="eva:checkmark-circle-fill" color="green" />
                    )}
                    {isError === true && <Iconify icon="eva:close-circle-fill" color="red" />}
                  </>
                )}
              </InputAdornment>
            )
          }}
        />

        <TextField
          name="password"
          label="New Password (min 8 characters)"
          autoComplete="current-password"
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
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters'
            }
          })}
          error={!!errors.password}
          helperText={errors?.password?.message}
          disabled={isLoading}
        />

        <TextField
          name="password"
          label="Confirm New Password"
          autoComplete="new-password"
          type={showConfirmPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            )
          }}
          {...register('passwordConfirm', {
            required: 'Confirm Password is required',
            validate: (value) => getValues().password === value || 'Passwords need to match'
          })}
          error={!!errors.passwordConfirm}
          helperText={errors?.passwordConfirm?.message}
          disabled={isLoading}
        />
      </Stack>

      <Divider sx={{ my: 2 }} />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        loading={isLoading}
      >
        Reset Password
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
            maxWidth: 450
          }}
        >
          <Typography variant="h4">Forgot your Password?</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Please insert your token from your email and new password in the input below.
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
