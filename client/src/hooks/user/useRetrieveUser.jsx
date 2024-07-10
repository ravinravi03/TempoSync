import { useState } from "react";
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useRetrieveUser = () =>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const retrieveUser = async (id) => {
        setIsLoading(true);

        try {
            let response = await axios.get((`${backendUrl}/db/user/${id}`),
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

    return { retrieveUser, isLoading, error };
}