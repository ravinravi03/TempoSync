import { useState } from "react";
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;


export const useGetUserProfile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getUserProfile = async () => {
        setIsLoading(true);
        try {
            let response = await axios.get((`${backendUrl}/spotify/profile`),{
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

    return { getUserProfile, isLoading, error };
}
