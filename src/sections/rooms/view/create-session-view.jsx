import React, { useState } from 'react';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Select,
  MenuItem,
  FormControl,
  Container,
  Button,
  Chip,
  InputLabel,
  OutlinedInput,
  Box,
  Typography,
  Input,
  Stack,
  Card,
  Divider,
  InputAdornment,
  IconButton,
  useMediaQuery
} from '@mui/material';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import roomIcon from '@iconify/icons-mdi/home-group';
import categoryIcon from '@iconify/icons-mdi/tag-multiple';
import lockIcon from '@iconify/icons-mdi/lock';
import lockOpenIcon from '@iconify/icons-mdi/lock-open';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import arrowBackIcon from '@iconify/icons-mdi/arrow-left';
import { useGetCategories, useCreateRoom } from 'src/sections/rooms/view/useRooms';
import { useSession } from './useSession';
import { useRouter } from '@/routes/hooks';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { alpha, useTheme } from '@mui/material/styles';
import Iconify from '@/components/iconify';

const CreateSession = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { session, isLoading } = useSession();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      isPrivate: false,
      password: ''
    }
  });

  const isPrivate = watch('isPrivate');

  const onSubmit = (formData) => {
    if (!formData) return;
    console.log(formData);
    let slug = 'test';
    formData.slug = slug;
    session(formData);
  };

  const glassStyle = {
    border: '1px solid rgba(255, 255, 255, 0.3)',
    marginTop: '2rem',
    padding: isMobile ? '2rem' : '5rem',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    width: '100%',
    maxWidth: '800px'
  };

  const renderForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <TextField
          label="Session title"
          placeholder="Enter an engaging title for your session"
          fullWidth
          margin="normal"
          variant="outlined"
          {...register('title', {
            required: 'Session title is required',
            minLength: {
              value: 3,
              message: 'Session title must be at least 3 characters'
            }
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
          disabled={isLoading}
        />
        <TextField
          label="Description"
          placeholder="Describe your session"
          multiline
          rows={3}
          fullWidth
          margin="normal"
          variant="outlined"
          {...register('description', {
            required: 'Session description is required',
            minLength: {
              value: 10,
              message: 'Session description must be at least 10 characters'
            }
          })}
          error={!!errors.description}
          helperText={errors.description?.message}
          disabled={isLoading}
        />
        <TextField
          label="Start Date"
          type="datetime-local"
          fullWidth
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          {...register('startDate', {
            required: 'Start date is required'
          })}
          error={!!errors.startDate}
          helperText={errors.startDate?.message}
          disabled={isLoading}
        />

        <TextField
          type="number"
          name="duration"
          label="Expected Session Hours"
          fullWidth
          {...register('duration', {
            required: 'Session duration is required'
          })}
          error={!!errors.duration}
          helperText={errors?.duration?.message}
          disabled={isLoading}
        />

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                {...register('isPrivate')}
                icon={<Icon icon={lockOpenIcon} />}
                checkedIcon={<Icon icon={lockIcon} />}
              />
            }
            label={isPrivate ? 'This room is private now.' : 'Make this room private'}
          />
          {isPrivate && (
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
                required: isPrivate && 'Password is required when the room is private',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              error={!!errors.password}
              helperText={errors?.password?.message}
              disabled={isLoading}
            />
          )}
        </FormGroup>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          loading={isLoading}
        >
          Create Session
        </LoadingButton>
      </Stack>
    </form>
  );

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ height: '100vh' }}>
      <Box sx={glassStyle}>
        <Button
          component={Link}
          to="/rooms"
          variant="outlined"
          color="primary"
          startIcon={<Icon icon={arrowBackIcon} width={24} height={24} />}
          icon
          here
          sx={{ mb: 2, textTransform: 'none', fontWeight: 'bold' }}
        >
          Return to Rooms
        </Button>
        {renderForm}
      </Box>
    </Stack>
  );
};

export default CreateSession;
