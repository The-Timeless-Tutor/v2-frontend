import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const SystemDownMessage = () => {
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
        Our server is down for now
      </Typography>
      <Typography variant="body1" gutterBottom>
        Our team is constantly working hard to get it back up and running as soon as possible.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please check back later or follow our social media for updates.
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="inherit"
          //   href="https://www.example.com/status"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check Status
        </Button>
      </Box>
    </Box>
  );
};

export default SystemDownMessage;
