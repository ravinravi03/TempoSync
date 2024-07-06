import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useGetUserPlaylists } from '../../hooks/useGetUserPlaylists';
import { getCookie } from '../../utilities/cookieUtils';
import PlaylistModal from './PlaylistModal';
import { useAppContext } from '../../AppContextProvider';


const PlaylistGrid = () => {
    const {userProfile} = useAppContext();
    const {getUserPlaylists, isLoading, error} = useGetUserPlaylists();
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(()=>{ 
        getUserPlaylists(getCookie('accessToken'),userProfile.id)
            .then(result => { 
                setUserPlaylists(result.items)
                console.log(result)
            }).catch(err =>{
                console.error("Error occurred", error);

                if (error.response && error.response.status === 404) {
                    setUserPlaylists([]);
                }
            })
    },[])

    const openModal = (playlist) => {
        setSelectedPlaylist(playlist);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedPlaylist(null);
    };

    if (isLoading) {
        return null;
    } else {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 overflow-auto">
                {userPlaylists.map((userPlaylist, index) => (
                    <div key={index} className="bg-secondary rounded-lg overflow-hidden text-center text-white relative shadow-md">
                        <img src={userPlaylist.images[0].url} alt={userPlaylist.name} className="w-full h-48 object-cover" />
                        <button onClick={() => openModal(userPlaylist)} className="bg-secondary-container bg-opacity-60 border-4 border-secondary text-white rounded-full p-2 absolute bottom-16 right-2 z-10">
                            <FaPlus color="black" />
                        </button>
                        <div className="p-4">
                            <p>{userPlaylist.name}</p>
                        </div>
                    </div>
                ))}
                <PlaylistModal isOpen={isModalOpen} onClose={closeModal} playlist={selectedPlaylist} />
            </div>
        );
    }
    
}

export default PlaylistGrid;
