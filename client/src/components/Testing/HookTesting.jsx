import React, { useState, useEffect } from 'react';
import { useGetUserProfile } from '../../hooks/useGetUserProfile.jsx';
import { useGetUserPlaylists } from '../../hooks/useGetUserPlaylists.jsx';
import { getCookie } from '../../utilities/cookieUtils.js';
import { useGetTrack } from '../../hooks/useGetTrack.jsx';
import { useGetPlaylistTracks } from '../../hooks/useGetPlaylistTracks.jsx';
import { useGetSearch } from '../../hooks/useSearch.jsx';
import { useCreatePlaylist } from '../../hooks/useCreatePlaylist.jsx';
import AuthTestComponent from './AuthTestComponent.jsx';
import { useAuth } from '../../hooks/auth/useAuth.jsx';

const HookTesting = () => {
    const [profileData, setProfileData] = useState([]);
    const { getUserProfile, isLoading, error } = useGetUserProfile();
    const { getUserPlaylists } = useGetUserPlaylists();
    const { getTrack } = useGetTrack();
    const { getSearch } = useGetSearch();
    const { getPlaylistTracks } = useGetPlaylistTracks();
    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [minTempo, setMinTempo] = useState(110);
    const [maxTempo, setMaxTempo] = useState(130);

    const [playlistName, setPlaylistName] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const { createPlaylist } = useCreatePlaylist();


    const incrementMinTempo = () => {
        setMinTempo((prevMinTempo) => (prevMinTempo !== null ? prevMinTempo + 1 : 1));
    };

    const decrementMinTempo = () => {
        setMinTempo((prevMinTempo) => (prevMinTempo > 1 ? prevMinTempo - 1 : null));
    };

    const incrementMaxTempo = () => {
        setMaxTempo((prevMaxTempo) => (prevMaxTempo !== null ? prevMaxTempo + 1 : 1));
    };

    const decrementMaxTempo = () => {
        setMaxTempo((prevMaxTempo) => (prevMaxTempo > 1 ? prevMaxTempo - 1 : null));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await createPlaylist(getCookie('accessToken'), playlistName, description, isPublic);
            console.log('Playlist created:', result);
        } catch (error) {
            console.error('Error creating playlist:', error);
        }
    };

    useEffect(() => {
        getUserProfile()
            .then(result => {
                setProfileData(result);
                console.log(result);
            })
            .catch(error => {
                console.error("Error occurred", error);

                if (error.response && error.response.status === 404) {
                    setProfileData([]);
                }
            });
    }, []);

    const handleClickGetUserPlaylists = () => {
        getUserPlaylists(getCookie('accessToken'), profileData.id)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.error("Error occurred", error);
            });
    };

    const handleClickGetTrack = () => {
        getTrack(getCookie('accessToken'), inputValue)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.error("Error occurred", error);
            });
    };

    const handleClickGetPlaylistTracks = () => {
        getPlaylistTracks(getCookie('accessToken'), inputValue2)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.error("Error occurred", error);
            });
    };

    const handleClickGetSearch = () => {
        getSearch(getCookie('accessToken'), searchValue, minTempo, maxTempo)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.error("Error occurred", error);
            });
    };

    if (profileData == []) {
        return null;
    } else {
        return (
            <div className="container mx-auto p-4">
                <h2 className="text-4xl font-bold mb-4">{profileData.display_name}</h2>
                <div className="mb-4">
                    <button className="bg-primary text-white py-2 px-4 rounded-lg" onClick={handleClickGetUserPlaylists}>
                        Get User's Playlists
                    </button>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter Track ID"
                        className="border border-gray-400 p-2 rounded-lg mr-2"
                    />
                    <button className="bg-primary text-white py-2 px-4 rounded-lg" onClick={handleClickGetTrack}>Get Track</button>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        value={inputValue2}
                        onChange={(e) => setInputValue2(e.target.value)}
                        placeholder="Enter Playlist ID"
                        className="border border-gray-400 p-2 rounded-lg mr-2"
                    />
                    <button className="bg-primary text-white py-2 px-4 rounded-lg" onClick={handleClickGetPlaylistTracks}>Get Playlist Tracks</button>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search Track"
                        className="border border-gray-400 p-2 rounded-lg mr-2"
                    />
                    <button className="bg-primary text-white py-2 px-4 rounded-lg" onClick={handleClickGetSearch}>Search Tracks</button>
                </div>
                <div className="mb-4">
                    <div className="flex items-center">
                        <div className="mr-4">
                            <h3 className="text-lg">Min Tempo: {minTempo !== null ? minTempo : 'Not set'}</h3>
                            <div className="flex">
                                <button className="bg-primary text-white py-2 px-4 rounded-lg mr-2" onClick={decrementMinTempo}>-</button>
                                <button className="bg-primary text-white py-2 px-4 rounded-lg" onClick={incrementMinTempo}>+</button>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg">Max Tempo: {maxTempo !== null ? maxTempo : 'Not set'}</h3>
                            <div className="flex">
                                <button className="bg-primary text-white py-2 px-4 rounded-lg mr-2" onClick={decrementMaxTempo}>-</button>
                                <button className="bg-primary text-white py-2 px-4 rounded-lg" onClick={incrementMaxTempo}>+</button>
                            </div>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="mb-4">
                        <label htmlFor="playlistName" className="block text-lg font-bold mb-2">Playlist Name:</label>
                        <input
                            type="text"
                            id="playlistName"
                            value={playlistName}
                            onChange={(e) => setPlaylistName(e.target.value)}
                            className="border border-gray-400 p-2 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-lg font-bold mb-2">Description:</label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border border-gray-400 p-2 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="isPublic" className="block text-lg font-bold mb-2">Public:</label>
                        <input
                            type="checkbox"
                            id="isPublic"
                            checked={isPublic}
                            onChange={(e) => setIsPublic(e.target.checked)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-primary text-white py-2 px-4 rounded-lg"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating...' : 'Create Playlist'}
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
            </div>
        );
    }
}

export default HookTesting;
