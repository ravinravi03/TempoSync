import { useState } from "react";
import axios from 'axios';

const backendUrl = 'http://localhost:5050';

export const useCreatePlaylist = () =>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const createPlaylist = async (accessToken, playlistName, description, isPublic) => {
        setIsLoading(true);
        const data = {
            playlistName: playlistName,
            description: description,
            public: isPublic
        };
        try {
            let response = await axios.post((`${backendUrl}/spotify/playlist`),data,
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

    return { createPlaylist, isLoading, error };
}