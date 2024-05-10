import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const FullPageSpinner = () => {
  return (
    <Box
      sx={{
        color: '#F99C1D',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        zIndex: 9999,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
        pointerEvents: 'none',
        overflow: 'hidden',
        userSelect: 'none'
      }}
    >
      <CircularProgress color="inherit" />
    </Box>
  );
};

export default FullPageSpinner;
