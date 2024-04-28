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

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();
  const router = useRouter();

  const handleSubmit = (e) => {
    console.log(firstName, lastName, email, password);
  };

  const handleSigninClick = () => {
    router.push('/login');
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            name="firstName"
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
          />
          <TextField
            name="lastName"
            label="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
          />
        </Stack>

        <TextField
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          fullWidth
        />

        <TextField
          name="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
        By signing up, I agree to the{' '}
        <Link href="/terms-of-service" sx={{ cursor: 'pointer' }}>
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy-policy" sx={{ cursor: 'pointer' }}>
          Privacy Policy
        </Link>
        .
      </Typography>

      <LoadingButton
        fullWidth
        size="large"
        type="button"
        variant="contained"
        color="inherit"
        sx={{ mt: 3 }}
        onClick={() => handleSubmit()}
      >
        Create account
      </LoadingButton>
    </>
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
          <Typography variant="h4">Get Started absolute free</Typography>

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
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
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
