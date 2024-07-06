import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useGetUserPlaylists } from '../../hooks/useGetUserPlaylists';
import { getCookie } from '../../utilities/cookieUtils';


const PlaylistGrid = () => {
    const {getUserPlaylists, isLoading, error} = useGetUserPlaylists();
    const [userPlaylists, setUserPlaylists] = useState([]);

    useEffect(()=>{ 
        getUserPlaylists(getCookie('accessToken'),"ravinravi03")
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

    const onAddButton= () => {
        console.log('Clicked the add button')
    }

    if (isLoading) {
        return null;
    } else {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 overflow-auto">
                {userPlaylists.map((userPlaylist, index) => (
                    <div key={index} className="bg-secondary rounded-lg overflow-hidden text-center text-white relative shadow-md">
                        <img src={userPlaylist.images[0].url} alt={userPlaylist.name} className="w-full h-48 object-cover" />
                        <button onClick={onAddButton} className="bg-secondary-container bg-opacity-60 border-4 border-secondary text-white rounded-full p-2 absolute bottom-16 right-2 z-10">
                            <FaPlus color="black" />
                        </button>
                        <div className="p-4">
                            <p>{userPlaylist.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    
}

export default PlaylistGrid;
