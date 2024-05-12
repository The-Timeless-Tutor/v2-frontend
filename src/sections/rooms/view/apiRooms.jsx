import { apiMiddleware } from 'src/middleware/apiMiddleware';

// Function to get the list of rooms
export const getRooms = async () => {
    try {
        const response = await apiMiddleware(`api/room/rooms`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch rooms');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to delete a room
export const deleteRoom = async (roomId) => {
    try {
        const response = await apiMiddleware(`api/room/delete_room`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roomId }),
        });
        if (!response.ok) {
            throw new Error('Failed to delete room');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to get room details by slug
export const getRoomDetail = async (slug) => {
    try {
        const response = await apiMiddleware(`api/room/rooms/${slug}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch room details');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Add other API functions for messages, participants, categories, etc., similarly
// api.js


// Function to request join a room
export const requestJoinRoom = async (slug, isPublic, currentUserEmail = '') => {
    // Set the URL and request body based on whether the room is public or private
    const joinUrl = isPublic
        ? 'api/room/rooms_participant/participant/'
        : `api/room/rooms_request_join/${slug}`;
    const body = isPublic
        ? JSON.stringify({ slug, email: currentUserEmail })
        : JSON.stringify({ slug });

    try {
        // Make the API call using the apiMiddleware
        const response = await apiMiddleware(joinUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body,
        });

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Failed to request join room. Status: ${response.status}`);
        }

        // Return the parsed response data
        return await response.json();
    } catch (error) {
        throw new Error(`Error requesting to join room: ${error.message}`);
    }
};

export const getCategories = async () => {
    try {
        const response = await apiMiddleware('api/room/get_categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to create a new room
export const createRoom = async (roomData) => {
    try {
        const response = await apiMiddleware('api/room/rooms/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(roomData),
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(`Failed to create room: ${errorResponse.message}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error creating room: ${error.message}`);
    }
};