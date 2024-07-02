import { useState } from "react";
import axios from 'axios';

const backendUrl = 'http://localhost:5050';

export const useUpdateTempoRange = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateTempoRange = async (playlistId, maxTempo, minTempo) => {
        setIsLoading(true);

        try {
            const response = await axios.put(`${backendUrl}/db/playlist/${playlistId}/updateTempoRange`, {
                maxTempo,
                minTempo
            });
            return response.data;

        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update tempo range');
            console.error('Failed to update tempo range:', error);
            throw error; 
        } finally {
            setIsLoading(false);
        }
    };

    return { updateTempoRange, isLoading, error };
};
