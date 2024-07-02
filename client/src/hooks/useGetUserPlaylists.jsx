import { useState } from "react";
import axios from 'axios';

const backendUrl = 'http://localhost:5050';

export const useGetUserPlaylists= () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getUserPlaylists = async (accessToken, username) => {
        setIsLoading(true);
        try {
            let response = await axios.get((`${backendUrl}/spotify/profile/playlists?username=${username}`),{
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

    return { getUserPlaylists, isLoading, error };
}