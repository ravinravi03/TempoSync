import { useState } from "react";
import axios from 'axios';

const backendUrl = 'http://localhost:5050';

export const useAddSongToPlaylist = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /*
    The structure of song is: 
    const song = {
        song_id: '',        // String: ID of the song (required)
        album_name: '',     // String: Name of the album (required)
        song_title: '',     // String: Title of the song (required)
        duration_ms: 0,     // Number: Duration of the song in milliseconds (required)
        artists: [],        // Array of Strings: Artists involved in the song (required)
        tempo: 0,           // Number: Tempo or beats per minute (BPM) of the song (required)
        album_art: ''       // String: URL or path to the album artwork (required)
    };

    */

    const addSongToPlaylist = async (playlistId, song) => {
        setIsLoading(true);

        try {
            const response = await axios.post(`${backendUrl}/db/playlist/${playlistId}/addSong`, { song }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;

        } catch (error) {
            setError(error.response?.data?.message || 'Failed to add song to playlist');
            console.error('Failed to add song to playlist:', error);
            throw error; 
        } finally {
            setIsLoading(false);
        }
    };

    return { addSongToPlaylist, isLoading, error };
};
