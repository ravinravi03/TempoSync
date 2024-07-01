import React, { useState, useEffect} from 'react'
import { useGetUserProfile } from '../../hooks/useGetUserProfile';
import { useGetUserPlaylists } from '../../hooks/useGetUserPlaylists';
import { getCookie } from '../../utilities/cookieUtils';
import { useGetTrack } from '../../hooks/useGetTrack';
import { useGetPlaylistTracks } from '../../hooks/useGetPlaylistTracks.jsx';
import { useGetSearch } from '../../hooks/useSearch';
import { useCreatePlaylist } from '../../hooks/useCreatePlaylist.jsx';

const Home = () => {
    const [profileData, setProfileData] = useState([]);
    const {getUserProfile, isLoading, error} = useGetUserProfile();
    const {getUserPlaylists} = useGetUserPlaylists();
    const {getTrack} = useGetTrack();
    const {getSearch} = useGetSearch();
    const {getPlaylistTracks} = useGetPlaylistTracks();
    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [minTempo, setMinTempo] = useState(110);
    const [maxTempo, setMaxTempo] = useState(130);

    const [playlistName, setPlaylistName] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const { createPlaylist }  = useCreatePlaylist();

  
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

    useEffect(()=>{
        getUserProfile(getCookie('accessToken'))
            .then(result =>{
                setProfileData(result);
                console.log(result);
            })
            .catch(error => {
                console.error("Error occured", error);

                if(error.response && error.response.status === 404){
                    setProfileData([]);
                }
            });
    },[])

    const handleClickGetUserPlaylists = () => {
        getUserPlaylists(getCookie('accessToken'),profileData.id)
            .then(result =>{
                console.log(result);
            })
            .catch(error => {
                console.error("Error occured", error)

            });
    }

    const handleClickGetTrack = () => {
        getTrack(getCookie('accessToken'),inputValue)
            .then(result =>{
                console.log(result);
            })
            .catch(error => {
                console.error("Error occured", error)
            });
    }

    const handleClickGetPlaylistTracks = () => {
        getPlaylistTracks(getCookie('accessToken'),inputValue2)
            .then(result =>{
                console.log(result);
            })
            .catch(error => {
                console.error("Error occured", error)
            });
    }

    const handleClickGetSearch = () => {
        getSearch(getCookie('accessToken'),searchValue, minTempo, maxTempo)
            .then(result =>{
                console.log(result);
            })
            .catch(error => {
                console.error("Error occured", error)
            });
    }

    if(profileData == []){
        return null;
    }else{
        return (
            <div>
                <h2>
                    {profileData.display_name}
                </h2>
                <div>
                    <button onClick={handleClickGetUserPlaylists}>
                        Get User's Playlists
                    </button>
                </div>
                <div>
                    <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="getTrack"
                    />
                    <button onClick={handleClickGetTrack}>getTrack</button>
                </div>
                <div>
                    <input
                    type="text"
                    value={inputValue2}
                    onChange={(e) => setInputValue2(e.target.value)}
                    placeholder="getPlaylistTracks"
                    />
                    <button onClick={handleClickGetPlaylistTracks}>getPlaylistTracks</button>
                </div>
                <div>
                    <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="getTrack"
                    />
                    <button onClick={handleClickGetSearch}>getSearchResults</button>
                </div>
                <div>
                    <div>
                        <h3>Min Tempo: {minTempo !== null ? minTempo : 'Not set'}</h3>
                        <button onClick={decrementMinTempo}>-</button>
                        <button onClick={incrementMinTempo}>+</button>
                    </div>
                    <div>
                        <h3>Max Tempo: {maxTempo !== null ? maxTempo : 'Not set'}</h3>
                        <button onClick={decrementMaxTempo}>-</button>
                        <button onClick={incrementMaxTempo}>+</button>
                    </div>
                </div>
            <div>
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="playlistName">Playlist Name:</label>
                <input
                    type="text"
                    id="playlistName"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="isPublic">Public:</label>
                <input
                    type="checkbox"
                    id="isPublic"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                />
            </div>
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Playlist'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
            </div>
            </div>
        )
    }
}

export default Home