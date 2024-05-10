import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';

import { useForgotPassword } from './useForgotPassword';

// ----------------------------------------------------------------------

export default function ForgotPasswordView() {
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { forgotPassword, isLoading } = useForgotPassword();

  const onSubmit = (formData) => {
    if (!formData) return;
    const { email } = formData;
    forgotPassword({ email });
  };

  const renderForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField
          type="email"
          autoComplete="email"
          size="large"
          name="email"
          label="Email address"
          {...register('email', {
            required: 'Email is required'
          })}
          error={!!errors.email}
          helperText={errors?.email?.message}
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
        Send
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
          <Typography variant="h4">Forgot your Password?</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Please insert your email in the input below and we will send an email with the link to
            reset your password.
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
