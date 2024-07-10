import { useState } from "react";
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useGetSearch = () =>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getSearch = async (accessToken, searchQuery, minTempo, maxTempo) => {
        setIsLoading(true);
        try {
            let response = await axios.get((`${backendUrl}/spotify/search?searchQuery=${searchQuery}&minTempo=${minTempo}&maxTempo=${maxTempo}`),{
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

    return { getSearch, isLoading, error };
}