import { useState } from "react";
import axios from 'axios';

const backendUrl = 'http://localhost:5050';

export const useUpdatePlaylistName = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updatePlaylistName = async (playlistId, newName) => {
        setIsLoading(true);

        try {
            const response = await axios.put(`${backendUrl}/db/playlist/${playlistId}/updateName`, {
                playlist_name: newName
            });
            return response.data;

        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update playlist name');
            console.error('Failed to update playlist name:', error);
            throw error; 
        } finally {
            setIsLoading(false);
        }
    };

    return { updatePlaylistName, isLoading, error };
};
