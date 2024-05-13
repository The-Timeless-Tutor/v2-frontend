import React, { useState } from 'react';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Box,
  Typography,
  Stack,
  InputAdornment,
  IconButton,
  useMediaQuery
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import lockIcon from '@iconify/icons-mdi/lock';
import lockOpenIcon from '@iconify/icons-mdi/lock-open';
import arrowBackIcon from '@iconify/icons-mdi/arrow-left';
import { useSession } from './useSession';
import { Controller, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import Iconify from '@/components/iconify';

const CreateSession = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { session, isLoading } = useSession();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      startDate: new Date(),
      isPrivate: false,
      password: ''
    }
  });

  const isPrivate = watch('isPrivate');

  const onSubmit = (formData) => {
    if (!formData) return;

    // TODO: slug will be based on room, for now use test
    let slug = 'test';
    formData.slug = slug;
    session(formData);
  };

  const glassStyle = {
    padding: isMobile ? '2rem' : '5rem',
    borderRadius: '10px',
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

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name="startDate"
            control={control}
            rules={{ required: 'Start date is required' }}
            render={({ field: { ref, ...restField } }) => (
              <DateTimePicker
                label="Start Date"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!errors.startDate}
                    helperText={errors.startDate?.message}
                    disabled={isLoading}
                  />
                )}
                {...restField}
              />
            )}
          />
        </LocalizationProvider>

        <TextField
          type="number"
          name="duration"
          label="Expected Session Hours"
          fullWidth
          {...register('duration', {
            required: 'Session duration is required',
            valueAsNumber: true
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
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ height: '100dvh', margin: isMobile ? '1rem' : '3rem' }}
    >
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
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }} align="center">
          Create a New Session
        </Typography>
        {renderForm}
      </Box>
    </Stack>
  );
};

export default CreateSession;
