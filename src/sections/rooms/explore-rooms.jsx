import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  Link,
  Stack,
  Typography,
  Button,
  Grid,
  useTheme,
  Skeleton
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useGetRooms, useJoinRoom } from './view/useRooms';
import { products } from 'src/_mock/products'; // Import mock products
import { useAuth } from 'src/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import chatIcon from '@iconify/icons-mdi/chat';

// Declare a global cache for images
const imageCache = new Map();

const exploreRoomsTheme = createTheme({
  palette: {
    primary: {
      main: '#1877F2' // Customize your primary color
    },
    secondary: {
      main: '#E7EFFA'
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    button: {
      textTransform: 'none', // Example of customizing text styling
      fontWeight: 'bold'
    }
  }
});

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

// Function to get or generate image URL
const getOrCreateRoomImage = (roomSlug) => {
  if (!imageCache.has(roomSlug)) {
    const randomIndex = Math.floor(Math.random() * products.length);
    const product = products[randomIndex];
    imageCache.set(roomSlug, product.cover);
  }
  return imageCache.get(roomSlug);
};

const ExploreRooms = ({ filterName = '' }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { rooms, isLoading } = useGetRooms();
  const { user: userData } = useAuth();
  const [actions, setActions] = useState({});
  const [filteredRooms, setFilteredRooms] = useState([]);

  // Memoize the participant check function
  const isParticipant = useCallback(
    (room) => {
      return room.participants.some(
        (participant) => participant.user.username === userData.username
      );
    },
    [userData]
  );

  // Initialize actions state and filter rooms efficiently
  useEffect(() => {
    const initialActions = {};
    if (rooms) {
      rooms.forEach((room) => {
        initialActions[room.slug] = isParticipant(room)
          ? 'Chat'
          : room.private
            ? 'Invitation Sent'
            : 'Join';
      });

      // Apply room name filter
      const lowercasedFilter = filterName.toLowerCase();
      setFilteredRooms(rooms.filter((room) => room.name.toLowerCase().includes(lowercasedFilter)));
    }
    setActions(initialActions);
  }, [rooms, isParticipant, filterName]);

  const { joinRoom } = useJoinRoom();

  // Handle the join room logic efficiently
  const handleJoinRoom = async (room) => {
    const currentAction = actions[room.slug];
    const isPublic = !room.private;
    const currentUserEmail = userData.email || '';

    if (currentAction === 'Join') {
      try {
        await joinRoom(room.slug, isPublic, currentUserEmail);
        setActions((prev) => ({
          ...prev,
          [room.slug]: room.private ? 'Invitation Sent' : 'Chat'
        }));
      } catch (error) {
        console.error('Failed to send join request:', error.message);
      }
    } else if (currentAction === 'Chat') {
      navigate(`/assessment/${room.slug}`);
    }
  };

  return (
    <Grid container spacing={3}>
      {isLoading
        ? // Show Skeletons while loading
          [...Array(8)].map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <Skeleton variant="rectangular" width="100%" height={150} />
                <Stack spacing={2} sx={{ padding: theme.spacing(2) }}>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="rectangular" width="100%" height={30} />
                </Stack>
              </Card>
            </Grid>
          ))
        : filteredRooms.map((room) => (
            <Grid item key={room.slug} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <Box sx={{ position: 'relative' }}>
                  <Box sx={{ position: 'relative', paddingTop: '50%' }}>
                    <Box
                      component="img"
                      alt={room.name}
                      src={getOrCreateRoomImage(room.slug)}
                      sx={{
                        width: '100%',
                        height: '80%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0
                      }}
                    />
                  </Box>
                </Box>
                <Stack spacing={2} sx={{ padding: theme.spacing(2) }}>
                  <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
                    {room.name}
                  </Link>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.5,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {truncateText(room.description, 30)}{' '}
                    {/* Adjust 100 to the desired character limit */}
                  </Typography>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <div
                      className="cursor-pointer text-sm text-[#1877F2] font-medium"
                      onClick={() => handleJoinRoom(room)}
                    >
                      {actions[room.slug]}
                    </div>
                    <Typography variant="body2" color="text.secondary">
                      Participants: {room.participants.length}
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          ))}
    </Grid>
  );
};

export default ExploreRooms;
