import React, { useState, useEffect } from 'react';
import { Box, Card, Link, Stack, Typography, Button, Grid, useTheme } from '@mui/material';
import { useGetRooms, useJoinRoom } from './view/useRooms';
import { products } from 'src/_mock/products'; // Import mock products
import { useAuth } from 'src/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


// Function to render cover image using mock product cover images


const renderImg = () => {
    // Get a random index to select a cover image from mock products
    const randomIndex = Math.floor(Math.random() * products.length);
    const product = products[randomIndex];


    return (
        <Box
            component="img"
            alt={product.name}
            src={product.cover}
            sx={{
                width: '100%',
                height: '80%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
            }}
        />
    );
};

const ExploreRooms = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { rooms, isLoading } = useGetRooms();
    const { user: userData } = useAuth();
    const [action, setAction] = useState('Join');

    useEffect(() => {
        // Initialize action state based on participant status
        const initialActions = {};
        rooms && rooms.forEach(room => {
            initialActions[room.slug] = isParticipant(room) ? 'Chat' : room.private ? 'Invitation Sent' : 'Join';
        });
        setAction(initialActions);
    }, [rooms]);

    const isParticipant = (room) => {
        // Check if the user is a participant in the room
        return room.participants.some(participant => participant.user.username === userData.username);
    };

    const { joinRoom } = useJoinRoom();

    const handleJoinRoom = async (room) => {
        const currentAction = action[room.slug];
        const isPublic = !room.private; // Determine if the room is public or private
        const currentUserEmail = userData.email || ''; // Replace this with your method for retrieving the current user's email

        if (currentAction === 'Join') {
            // If the current action is 'Join', attempt to join the room
            try {
                // Pass the required parameters to the `joinRoom` function
                await joinRoom(room.slug, isPublic, currentUserEmail);

                console.log('Join request sent successfully.');
                // Update the action state locally based on the room's privacy status
                setAction((prevActions) => ({
                    ...prevActions,
                    [room.slug]: room.private ? 'Invitation Sent' : 'Chat',
                }));
            } catch (error) {
                console.error('Failed to send join request:', error.message);
            }
        } else if (currentAction === 'Invitation Sent') {
            console.log('Wait for confirmation email.');
        } else if (currentAction === 'Chat') {
            // Navigate to the assessment page if the action is "Chat"
            navigate(`/assessment/${room.slug}`);
        }
    };



    return (
        <Grid container spacing={3}>
            {rooms && rooms.map((room, index) => (
                <Grid item key={room.slug} xs={12} sm={6} md={4} lg={3}>

                    <Card>
                        <Box sx={{ position: 'relative' }}>
                            <Box sx={{ position: 'relative', paddingTop: '50%' }}>
                                {renderImg()}
                            </Box>
                        </Box>

                        <Stack spacing={2} sx={{ padding: theme.spacing(2) }}>
                            <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
                                {room.name}
                            </Link>

                            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                {room.description}
                            </Typography>

                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Button variant="contained" onClick={() => handleJoinRoom(room)}>
                                    {action[room.slug]} {/* Change button text based on participant status */}
                                </Button>
                                <Typography variant="body2" color="text.secondary">
                                    Participants: {room.participants.length} {/* Render number of participants */}
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
