import { useState } from "react";
import axios from 'axios';

const backendUrl = 'http://localhost:5050';

export const useRemoveCreatedPlaylist = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const removeCreatedPlaylist = async (userId, playlistId) => {
        setIsLoading(true);

        try {
            let response = await axios.delete(`${backendUrl}/db/user/${userId}/createdPlaylist/${playlistId}`);
            return response.data;

        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong');
            console.log(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return { removeCreatedPlaylist, isLoading, error };
};
