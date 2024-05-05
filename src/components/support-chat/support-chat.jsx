import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  IconButton,
  Typography,
  Divider,
  Slide,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import ChatIcon from '@mui/icons-material/Chat';

import { apiMiddleware } from '@/middleware/apiMiddleware';
import { useAccessToken } from './useAccessToken';
import { useSubmitEnquiry } from './useSubmitEnquiry';
import { LoadingButton } from '@mui/lab';

export default function SupportChat() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { enquiry, isLoading } = useSubmitEnquiry();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const chatboxToggleHandler = () => {
    setIsChatOpen(!isChatOpen);
  };

  const onSubmit = async (formData) => {
    if (!formData) return;
    enquiry(formData);
  };
  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 50 }}>
      <Box sx={{ position: 'relative', display: 'inline-block' }}>
        <Button
          variant="contained"
          color="inherit"
          onClick={chatboxToggleHandler}
          sx={{ borderRadius: '50%', minWidth: 56, height: 56 }}
        >
          {isChatOpen ? <KeyboardArrowDownRoundedIcon /> : <ChatIcon />}
        </Button>
        <Slide direction="up" in={isChatOpen} mountOnEnter unmountOnExit>
          <Box
            sx={{
              position: 'absolute',
              bottom: 60,
              right: 0,
              width: 360,
              border: 1,
              borderColor: 'grey.300',
              borderRadius: 2,
              bgcolor: 'background.paper',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
            >
              <Stack direction="column" spacing={2}>
                <Typography variant="h6" sx={{ color: 'inherit' }}>
                  Hi there 👋 How can we help?
                </Typography>
                <Typography sx={{ color: 'inherit' }} variant="body2">
                  Please fill out the form below for your enquiry.
                </Typography>
              </Stack>
            </Box>
            <Box sx={{ p: 2 }} component="form" onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                label="Subject"
                margin="normal"
                variant="outlined"
                {...register('subject', { required: 'Subject is required' })}
                error={!!errors.subject}
                helperText={errors.subject?.message}
              />
              <TextField
                label="Enquiry message"
                multiline
                fullWidth
                rows={5}
                {...register('message', { required: 'Enquiry message is required' })}
                error={!!errors.message}
                helperText={errors?.message?.message}
              />
              <Divider sx={{ my: 2 }} />

              <LoadingButton
                loading={isLoading}
                type="submit"
                size="large"
                fullWidth
                variant="contained"
                color="inherit"
              >
                Send Enquiry Message
              </LoadingButton>
            </Box>
          </Box>
        </Slide>
      </Box>
    </Box>
  );
}
