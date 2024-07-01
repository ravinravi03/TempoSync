import { useState } from "react";
import axios from 'axios';

const backendUrl = 'http://localhost:5050';

export const useAddTracksToPlaylist = () =>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const addTracksToPlaylist = async (accessToken, playlistId, tracks) => {
        setIsLoading(true);
        const data = {
            playlistId: playlistId,
            tracks: tracks
        };
        try {
            let response = await axios.post((`${backendUrl}/spotify/playlist/addTracks`),data,
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

    return { addTracksToPlaylist, isLoading, error };
}