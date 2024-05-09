import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary'
      }}
    >
      <Typography variant="h4" gutterBottom>
        Oops, something went wrong!
      </Typography>
      <Typography variant="body1" gutterBottom>
        {error.message}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button
          size="large"
          variant="contained"
          color="inherit"
          onClick={resetErrorBoundary}
          sx={{ mt: 2 }}
        >
          Try again
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorFallback;
