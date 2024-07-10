import { useState } from "react";
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useRemoveSongFromPlaylist = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const removeSongFromPlaylist = async (playlistId, songId) => {
        setIsLoading(true);

        try {
            const response = await axios.delete(`${backendUrl}/db/playlist/${playlistId}/removeSong/${songId}`);
            return response.data;

        } catch (error) {
            setError(error.response?.data?.message || 'Failed to remove song from playlist');
            console.error('Failed to remove song from playlist:', error);
            throw error; 
        } finally {
            setIsLoading(false);
        }
    };

    return { removeSongFromPlaylist, isLoading, error };
};
