import { useState } from "react";
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useCreateDraftedPlaylist = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /*
    playlistDetails takes the form of
    {
    "playlist_name": "string",
    "isPublic": "boolean",
    "description": "string",
    "maxTempo": "number",
    "minTempo": "number",
    "songs": [
        {
        "song_id": "string",
        "album_name": "string",
        "song_title": "string",
        "duration_ms": "number",
        "artists": ["array of strings"],
        "tempo": "number",
        "album_art": "string"
        }
    ]
    }

    */

    const createDraftedPlaylist = async (userId, playlistDetails) => {
        setIsLoading(true);

        const data = {
            playlistDetails
        };

        try {
            let response = await axios.post(`${backendUrl}/db/user/${userId}/draftedPlaylist`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;

        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong');
            console.log(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return { createDraftedPlaylist, isLoading, error };
};
