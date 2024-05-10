import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { InputAdornment, OutlinedInput, IconButton, Box } from '@mui/material';
import { Icon } from '@iconify/react';
import AddIcon from '@mui/icons-material/Add';

import ExploreRooms from '../sections/rooms/explore-rooms';

export default function RoomsPage() {
  const [filterName, setFilterName] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    navigate('/create-room');
  };

  return (
    <>
      <Helmet>
        <title>Rooms | The Timeless Tutor</title>
      </Helmet>
      <Container>
        <OutlinedInput
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          placeholder="Search Rooms by name, category, etc."
          sx={{ width: '100%', marginBottom: 2 }}
          startAdornment={
            <InputAdornment position="start">
              <Icon
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
        <div className='flex justify-between'>
          <Typography variant="h4" sx={{ mb: 3 }}>
            🏛️ Recommended Rooms
          </Typography>
          <div className='flex items-center gap-2 cursor-pointer' onClick={handleCreateRoom}>
            <i className="ri-add-line"></i><p>Create New Room</p>
          </div>
        </div>
        <ExploreRooms />
      </Container>
    </>
  );
}