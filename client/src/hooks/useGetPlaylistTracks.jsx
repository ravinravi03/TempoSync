import { useState } from "react";
import axios from 'axios';

const backendUrl = 'http://localhost:5050';

export const useGetPlaylistTracks = () =>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getPlaylistTracks = async (accessToken, playlistId) => {
        setIsLoading(true);
        try {
            let response = await axios.get((`${backendUrl}/spotify/playlist?playlistId=${playlistId}`),{
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

    return { getPlaylistTracks, isLoading, error };
}