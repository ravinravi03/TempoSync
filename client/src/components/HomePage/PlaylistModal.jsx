import React, { useState, useEffect } from 'react';
import {useGetPlaylistTracks} from '../../hooks/useGetPlaylistTracks'
import { getCookie } from '../../utilities/cookieUtils';

const PlaylistModal = ({ isOpen, onClose, playlist }) => {
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [minTempo, setMinTempo] = useState(80);
  const [maxTempo, setMaxTempo] = useState(120);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const {getPlaylistTracks, fetchAllTracks, isLoading, error} = useGetPlaylistTracks();

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
    console.log('Create Playlist', { description, isPublic, minTempo, maxTempo });
    console.log('Filtered Tracks:', filterTracksByTempoRange());
  };

  const handleAddToDrafts = () => {
    console.log('Add to Drafts', { description, isPublic, minTempo, maxTempo });
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
            onChange={(e) => setMinTempo(e.target.value)}
          />
          <span className="text-white mx-4">to</span>
          <input
            type="number"
            className="w-16 p-2 text-center text-black rounded"
            value={maxTempo}
            onChange={(e) => setMaxTempo(e.target.value)}
          />
        </div>

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
        
        <div className="flex justify-center gap-8 mt-auto">
          <button className="bg-tertiary-container text-on-tertiary-container py-2 px-4 rounded" onClick={handleCreatePlaylist}>
            Create
          </button>
          <button className="bg-tertiary-container text-on-tertiary-container py-2 px-4 rounded" onClick={handleAddToDrafts}>
            Add to Drafts
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistModal;

