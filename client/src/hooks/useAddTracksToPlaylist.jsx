import { useState } from "react";
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useAddTracksToPlaylist = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const addTracksToPlaylist = async (playlistId, tracks) => {
        setIsLoading(true);

        try {
            const batchSize = 100;
            const numberOfBatches = Math.ceil(tracks.length / batchSize);

            for (let i = 0; i < numberOfBatches; i++) {
                const batch = tracks.slice(i * batchSize, (i + 1) * batchSize);

                const data = {
                    playlistId: playlistId,
                    tracks: batch
                };

                let response = await axios.post(`${backendUrl}/spotify/playlist/addTracks`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });

                console.log(`Batch ${i + 1} added successfully`, response.data);
            }

            return { message: "Tracks added successfully" };

        } catch (error) {
            setError(error.response?.data?.error || 'Something went wrong');
            console.error('Error adding tracks:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return { addTracksToPlaylist, isLoading, error };
};
