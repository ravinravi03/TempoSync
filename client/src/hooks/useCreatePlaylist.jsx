import { useState } from "react";
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useCreatePlaylist = () =>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const createPlaylist = async (playlistName, description, isPublic) => {
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
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log(response.data)
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