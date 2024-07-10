import { useState } from "react";
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useUpdateUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /*
    updateData can take the form of 
    {
    "display_name": "New Display Name",
    "profile_picture": "new-profile-picture-url",
    "draftedPlaylists": ["60d21b4667d0d8992e610c85", "60d21b4667d0d8992e610c86"],
    "createdPlaylists": [
        {
        "id": "playlist123",
        "maxTempo": 180,
        "minTempo": 100
        },
        {
        "id": "playlist456",
        "maxTempo": 200,
        "minTempo": 120
        }
    ]
    }
 */

    const updateUser = async (id, updateData) => {
        setIsLoading(true);

        try {
            let response = await axios.patch(`${backendUrl}/db/user/${id}`, updateData, {
                headers: {
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

    return { updateUser, isLoading, error };
}
