import { useState } from "react";
import axios from 'axios';

const backendUrl = 'http://localhost:5050';

export const useUpdateIsPublic = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateIsPublic = async (playlistId, newIsPublic) => {
        setIsLoading(true);

        try {
            const response = await axios.put(`${backendUrl}/db/playlist/${playlistId}/updateIsPublic`, {
                isPublic: newIsPublic
            });
            return response.data;

        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update isPublic');
            console.error('Failed to update isPublic:', error);
            throw error; 
        } finally {
            setIsLoading(false);
        }
    };

    return { updateIsPublic, isLoading, error };
};
