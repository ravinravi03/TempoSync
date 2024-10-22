import { useState } from "react";
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useGetPlaylistTracks = () =>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getPlaylistTracks = async (playlistId, offset=0, limit=100) => {
        setIsLoading(true);
        try {
            let response = await axios.get((`${backendUrl}/spotify/playlist`),{
                params: {
                    playlistId,
                    offset,
                    limit
                },
                headers:{
                    'Content-Type': 'application/json'
                },
                withCredentials: true
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

    const fetchAllTracks = async (playlistId, totalTracks) => {
        setIsLoading(true);
        setError(null);
        let allTracks = [];
        let offset = 0;
        const limit = 100;

        try {
            while (offset < totalTracks) {
                const result = await getPlaylistTracks(playlistId, offset, limit);
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