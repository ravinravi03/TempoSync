import { useState } from "react";
import axios from 'axios';

const backendUrl = 'http://localhost:5050';

export const useRemoveTracksFromPlaylist = () =>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const removeTracksFromPlaylist = async (accessToken, playlistId, tracks) => {
        setIsLoading(true);
        const data = {
            playlistId: playlistId,
            tracks: tracks
        };
        try {
            let response = await axios.delete((`${backendUrl}/spotify/playlist/removeTracks`),data,
            {
                headers:{
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;

        } catch (error) {
            setError(error.response?.data?.error || 'Something went wrong');
            console.log(error);
            throw error; 
        } finally {
            setIsLoading(false);
        }
    };

    return { removeTracksFromPlaylist, isLoading, error };
}