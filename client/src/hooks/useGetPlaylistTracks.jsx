import { useState } from "react";
import axios from 'axios';

const backendUrl = 'http://localhost:5050';

export const useGetPlaylistTracks = () =>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getPlaylistTracks = async (accessToken, playlistId, offset=0, limit=100) => {
        setIsLoading(true);
        try {
            let response = await axios.get((`${backendUrl}/spotify/playlist`),{
                params: {
                    playlistId,
                    offset,
                    limit
                },
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

    const fetchAllTracks = async (accessToken, playlistId, totalTracks) => {
        setIsLoading(true);
        setError(null);
        let allTracks = [];
        let offset = 0;
        const limit = 100;

        try {
            while (offset < totalTracks) {
                const result = await getPlaylistTracks(accessToken, playlistId, offset, limit);
                allTracks = [...allTracks, ...result];
                offset += limit;
            }
        } catch (error) {
            setError(error.response?.data?.error || 'Something went wrong');
            console.log(error);
            throw error;
        } finally {
            setIsLoading(false);
        }

        return allTracks;
    };

    return { getPlaylistTracks, fetchAllTracks, isLoading, error };
}