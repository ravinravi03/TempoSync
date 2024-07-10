import { useState } from "react";
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useRetrievePlaylist = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const retrievePlaylist = async (playlistId) => {
        setIsLoading(true);

        try {
            let response = await axios.get(`${backendUrl}/db/playlist/${playlistId}`);
            return response.data;

        } catch (error) {
            setError(error.response?.data?.message || 'Failed to retrieve playlist');
            console.error('Failed to retrieve playlist:', error);
            throw error; 
        } finally {
            setIsLoading(false);
        }
    };

    return { retrievePlaylist, isLoading, error };
};