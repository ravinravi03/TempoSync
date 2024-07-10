import { useState } from "react";
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useDeleteDraftedPlaylist = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteDraftedPlaylist = async (userId, playlistId) => {
        setIsLoading(true);

        try {
            let response = await axios.delete(`${backendUrl}/db/user/${userId}/draftedPlaylist/${playlistId}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;

        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong');
            console.log(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return { deleteDraftedPlaylist, isLoading, error };
};
