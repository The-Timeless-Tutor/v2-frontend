import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
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
import Checkbox from '@mui/material/Checkbox';
import { useMediaQuery } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { useRegister } from './useRegister';
import { generateUniqueUsername } from '@/utils/helpers';
import { WorldcoinLogo } from '@/assets/landing-assets';
import { PhoneNumber } from '@/components/ui/phone-number-input';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const { registerUser, isLoading } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captchaResponse, setCaptchaResponse] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  const handleCaptchaChange = (response) => {
    setCaptchaResponse(response);
    setCaptchaError(false);
  };

  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
    if (!captchaResponse) {
      setCaptchaError(true);
      return;
    }
    if (!formData) return;

    const { firstName, lastName, email, phone, username, password } = formData;

    const data = {
      captcha_response: captchaResponse,
      name: `${firstName} ${lastName}`,
      email,
      password,
      username,
      profile: {
        phone,
        sub: '1',
        verified_at: new Date().toISOString().slice(0, 10) // Example: "2023-09-29"
      }
    };
    registerUser(data);
  };

  const handleSigninClick = () => {
    router.push('/login');
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
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            type="email"
            name="email"
            label="Email address"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Please provide a valid email address'
              }
            })}
            error={!!errors.email}
            helperText={errors?.email?.message}
            disabled={isLoading}
          />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            name="firstName"
            label="First Name"
            fullWidth
            {...register('firstName', {
              required: 'First name is required'
            })}
            error={!!errors.firstName}
            helperText={errors?.firstName?.message}
            disabled={isLoading}
          />

          <TextField
            name="lastName"
            label="Last Name"
            fullWidth
            {...register('lastName', {
              required: 'Last name is required'
            })}
            error={!!errors.lastName}
            helperText={errors?.lastName?.message}
            disabled={isLoading}
          />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            name="username"
            label="Username"
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 5,
                message: 'Username must be at least 5 characters long'
              }
            })}
            error={!!errors.username}
            helperText={errors?.username?.message}
            disabled={isLoading}
          />
          <Controller
            name="phone"
            control={control}
            rules={{
              required: 'Phone number is required',
              pattern: {
                value: /^\+?[1-9]\d{1,14}$/, // Make sure to use the correct regex for your use case
                message: 'Please enter a valid phone number'
              }
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <PhoneNumber
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
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
              required: 'Password is required',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/,
                message:
                  'Password must contain at least one uppercase letter, one lowercase letter, one special character and one digit (8 characters minimum)'
              }
            })}
            error={!!errors.password}
            helperText={errors?.password?.message}
            disabled={isLoading}
          />

          <TextField
            fullWidth
            name="confirmPassword"
            label="Confirm New Password"
            type={showConfirmPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
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
      </Stack>
      <Typography variant="caption" sx={{ my: 2, display: 'block' }}>
        <Checkbox
          {...register('termsOfService', {
            required: true
          })}
          defaultChecked
          error={!!errors.termsOfService} // Add this line
          sx={{
            '& .MuiSvgIcon-root': {
              color: errors.termsOfService ? 'error.main' : 'primary.main' // Add this line
            },
            '&.Mui-checked': {
              color: 'primary.main'
            }
          }}
        />
        By signing up, I agree to the
        <Link to="/terms-of-service" sx={{ cursor: 'pointer' }}>
          Terms of Service
        </Link>
        and
        <Link to="/privacy-policy" sx={{ cursor: 'pointer' }}>
          Privacy Policy
        </Link>
        .
      </Typography>

      <Box
        sx={{
          my: 1,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <ReCAPTCHA sitekey={import.meta.env.VITE_SITE_KEY} onChange={handleCaptchaChange} />
        {captchaError && (
          <Typography variant="caption" color="error">
            Please verify that you are not a robot by completing the captcha.
          </Typography>
        )}
      </Box>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        loading={isLoading}
      >
        Create account
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
        minHeight: '100vh', // Ensures full screen height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            height: 1,
            maxWidth: 700,
            overflowY: 'auto'
          }}
        >
          <Typography variant="h4">Get Started For Absolute Free</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Already have an account?
            <Link
              variant="subtitle2"
              sx={{ ml: 0.5, cursor: 'pointer' }}
              onClick={handleSigninClick}
            >
              Sign in
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
              {mdUp && <Typography sx={{ ml: 1 }}>Sign up with Google</Typography>}
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
                <Typography sx={{ ml: 1, whiteSpace: 'nowrap' }}>Sign up with Worldcoin</Typography>
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
