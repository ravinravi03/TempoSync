import React, { useState, useEffect } from 'react';
import {useGetPlaylistTracks} from '../../hooks/useGetPlaylistTracks'
import { getCookie } from '../../utilities/cookieUtils';
import { useCreatePlaylist } from '../../hooks/useCreatePlaylist';
import { useCreateDraftedPlaylist } from '../../hooks/user/useCreateDraftedPlaylist';
import { useAddTracksToPlaylist } from '../../hooks/useAddTracksToPlaylist';
import { useAppContext } from '../../AppContextProvider';
import CircleLoader from "react-spinners/CircleLoader"
import { useCreateCreatedPlaylist } from '../../hooks/user/useCreateCreatedPlaylist';

const PlaylistModal = ({ isOpen, onClose, playlist }) => {
  const {userProfile} = useAppContext();
  const [playlistName, setPlaylistName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [minTempo, setMinTempo] = useState(80);
  const [maxTempo, setMaxTempo] = useState(120);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [createdPlaylistId, setCreatedPlaylistId] = useState(null);
  const {fetchAllTracks, isLoading:isLoadingTracks, error} = useGetPlaylistTracks();
  const {createDraftedPlaylist} = useCreateDraftedPlaylist();
  const {createPlaylist} = useCreatePlaylist();
  const {addTracksToPlaylist, isLoading:isLoadingAddTracks} = useAddTracksToPlaylist();
  const {createCreatedPlaylist} = useCreateCreatedPlaylist();

  useEffect(() => {
    if (!isOpen) {
      resetStates();
    }
  }, [isOpen]);

  useEffect(() => {
    console.log(playlist)
    if(playlist){
      fetchAllTracks(getCookie('accessToken'),playlist.id,playlist.tracks.total)
        .then(result => {
          setPlaylistTracks(result);
          console.log(result)
        }).catch(err => {
          console.error("Error occurred", error);

          if (error.response && error.response.status === 404) {
              setPlaylistTracks([]);
          }
        })
    }
  }, [playlist])

  const resetStates = () => {
    setPlaylistName('');
    setDescription('');
    setIsPublic(false);
    setMinTempo(80);
    setMaxTempo(120);
  };

  const filterTracksByTempoRange = () => {
    if (playlistTracks.length === 0) return [];

    return playlistTracks.filter(track => {
      const tempo = track.tempo;
      return tempo >= minTempo && tempo <= maxTempo;
    });
  };

  if (!isOpen) return null;

  const handleCreatePlaylist = () => {
    const name = playlistName || `${playlist.name} (TempoSynced)`;
    const defaultDescription = "A playlist created by TempoSync";
    const finalDescription = description.trim() ? description : defaultDescription;
  
    console.log('Create Playlist', { name, description: finalDescription, isPublic, minTempo, maxTempo });
    console.log('Filtered Tracks:', filterTracksByTempoRange());

    createPlaylist(getCookie('accessToken'),name,finalDescription,isPublic)
      .then(result => {
        setCreatedPlaylistId(result.id);
        console.log(result)

        const filteredTracks = filterTracksByTempoRange();
        const songs = filteredTracks.map(track => track.uri)
    
        addTracksToPlaylist(getCookie('accessToken'),createdPlaylistId,songs)

      }).catch(err => {
        console.error("Error occurred", error);

        if (error.response && error.response.status === 404) {
            setCreatedPlaylistId(null);
        }
      })

    
    const createdPlaylist = {
      id: createdPlaylistId,
      maxTempo: maxTempo,
      minTempo: minTempo,
    }

    createCreatedPlaylist(userProfile.id,createdPlaylist);

  };

  const handleAddToDrafts = () => {
    const name = playlistName || `${playlist.name} (TempoSynced)`;
    const defaultDescription = "A playlist created by TempoSync";
    const finalDescription = description.trim() ? description : defaultDescription;
    const filteredTracks = filterTracksByTempoRange()
  
    console.log('Add to drafts', { name, description: finalDescription, isPublic, minTempo, maxTempo });  
    console.log('Filtered Tracks:', filteredTracks);

    const songs = filteredTracks.map(track => ({
      song_id: track.id,
      album_name: track.album.name,
      song_title: track.name,
      duration_ms: track.duration_ms,
      artists: track.artists.map(artist => artist.name).join(', '),
      tempo: track.tempo,
      album_art: track.album.images.length > 0 ? track.album.images[0].url : ''
    }));

    const playlistDetails = {
      playlist_name: name,
      isPublic: isPublic,
      description: finalDescription,
      maxTempo: maxTempo,
      minTempo: minTempo,
      songs: songs
    }
    console.log(playlistDetails)
    createDraftedPlaylist(userProfile.id,playlistDetails)
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-tertiary p-8 rounded-lg w-1/3 h-auto flex flex-col relative">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-2xl mb-4">{playlist.name}</h2>
          <button className="text-white absolute top-2 right-2" onClick={onClose}>
            x
          </button>
        </div>
  
        <p className="text-white mb-4 text-center">Select a Tempo Range</p>
        <div className="flex items-center justify-center mb-4">
          <input
            type="number"
            className="w-16 p-2 text-center text-black rounded"
            value={minTempo}
            onChange={(e) => setMinTempo(parseInt(e.target.value))}
          />
          <span className="text-white mx-4">to</span>
          <input
            type="number"
            className="w-16 p-2 text-center text-black rounded"
            value={maxTempo}
            onChange={(e) => setMaxTempo(parseInt(e.target.value))}
          />
        </div>

        <textarea
          className="w-full p-2 text-black rounded mb-4"
          placeholder = {`Name this playlist, default is \'${playlist.name} (TempoSynced)\'`}
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />

        <textarea
          className="w-full p-2 text-black rounded mb-4"
          placeholder="Add a description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="publicCheckbox"
            className="mr-2"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          <label htmlFor="publicCheckbox" className="text-white">Make Playlist Public</label>
        </div>
        
        {isLoadingTracks || isLoadingAddTracks ? (
          <div className="flex justify-center items-center mt-auto">
            <CircleLoader></CircleLoader>
          </div>
        ) : (
          <div className="flex justify-center gap-8 mt-auto">
            <button
              className="bg-tertiary-container text-on-tertiary-container py-2 px-4 rounded"
              onClick={handleCreatePlaylist}
            >
              Create
            </button>
            <button
              className="bg-tertiary-container text-on-tertiary-container py-2 px-4 rounded"
              onClick={handleAddToDrafts}
            >
              Add to Drafts
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistModal;

