import { useState } from "react";
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useCreateUser = () =>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const createUser = async (id, display_name, profile_picture) => {
        setIsLoading(true);
        
        const data = {
            id: id,
            display_name: display_name,
            profile_picture: profile_picture
        };

        try {
            let response = await axios.post((`${backendUrl}/db/user`),data,
            {
                headers:{
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

    return { createUser, isLoading, error };
}