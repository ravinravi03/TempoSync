import { useState } from "react";
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useGetTrack = () =>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getTrack = async (trackId) => {
        setIsLoading(true);
        try {
            let response = await axios.get((`${backendUrl}/spotify/track?trackId=${trackId}`),{
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

    return { getTrack, isLoading, error };
}