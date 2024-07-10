import { useState } from "react";
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useUpdateDescription = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateDescription = async (playlistId, newDescription) => {
        setIsLoading(true);

        try {
            const response = await axios.put(`${backendUrl}/db/playlist/${playlistId}/updateDescription`, {
                description: newDescription
            });
            return response.data;

        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update description');
            console.error('Failed to update description:', error);
            throw error; 
        } finally {
            setIsLoading(false);
        }
    };

    return { updateDescription, isLoading, error };
};
