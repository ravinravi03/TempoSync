import { useState } from "react";
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useCreateCreatedPlaylist = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /*
    playlistDetails takes the form of:
    {
    "playlistDetails": {
        "id": "playlist_id_here",
        "maxTempo": 120,
        "minTempo": 80
    }
}
    */


    const createCreatedPlaylist = async (userId, playlistDetails) => {
        setIsLoading(true);

        const data = {
            playlistDetails: playlistDetails
        };

        try {
            let response = await axios.post(`${backendUrl}/db/user/${userId}/createdPlaylist`, data, {
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

    return { createCreatedPlaylist, isLoading, error };
};
