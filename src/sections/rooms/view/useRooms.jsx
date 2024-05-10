import { useQuery } from '@tanstack/react-query';
import { getRooms, requestJoinRoom, getRoomDetail, getCategories, createRoom } from './apiRooms';

// Hook to fetch rooms data
export function useGetRooms() {
    const { isLoading, data: rooms } = useQuery({
        queryKey: ['rooms'],
        queryFn: getRooms,
        // queryFn: requestJoinRoom,
    });

    return { rooms, isLoading };
}

export const useJoinRoom = () => {
    const joinRoom = async (slug, isPublic, currentUserEmail = '') => {
        try {
            await requestJoinRoom(slug, isPublic, currentUserEmail);
            console.log('Join request sent successfully.');
        } catch (error) {
            console.error('Failed to send join request:', error.message);
        }
    };

    return { joinRoom };
};

// Hook to fetch room details based on the slug
export const useGetRoomDetail = (slug) => {
    const { isLoading, data: room, error } = useQuery({
        queryKey: ['roomDetail', slug], // This should be inside an object
        queryFn: () => getRoomDetail(slug), // Use an arrow function for the query
    });

    if (error) {
        console.error(`Error fetching details for room ${slug}:`, error);
    }

    return { room, isLoading };
};

// Hook to fetch all categories
export function useGetCategories() {
    const { isLoading, data: categories, error } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });

    if (error) {
        console.error('Error fetching categories:', error.message);
    }

    return { categories, isLoading };
}

// Hook to create a new room
export const useCreateRoom = () => {
    const createNewRoom = async (roomData) => {
        try {
            const newRoom = await createRoom(roomData);
            console.log('Room created:', newRoom);
        } catch (error) {
            console.error('Failed to create room:', error.message);
        }
    };

    return { createNewRoom };
};