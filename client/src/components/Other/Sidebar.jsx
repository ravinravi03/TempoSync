import React, { useEffect, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { getCookie, invalidateCookie } from '../../utilities/cookieUtils';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContextProvider';

const Sidebar = () => {
    const {userProfile, setUserProfile} = useAppContext();
    const navigate = useNavigate();

    const onLogout = () => {
        invalidateCookie('accessToken')
        invalidateCookie('refreshToken')
        setUserProfile(null);
        navigate('/login')
    }

    const onHome = () => {
        navigate('/main/home')
    }

    if(!userProfile){
        return null;
    }else{
        return (
            <div className="bg-primary text-white w-64 p-4 m-4 rounded-md flex flex-col items-center">
                <div className="flex items-center mb-8">
                    <div>
                        <p className="text-xl">{userProfile.display_name}</p>
                        <button className="bg-error-container text-on-error-container py-2 px-4 rounded mt-4" onClick={onLogout}>
                            Logout
                        </button>
                    </div>
                    {userProfile.images && userProfile.images[1] ? (
                        <img src={userProfile.images[1].url} alt="Profile" className="rounded-full w-24 h-24 ml-4 border-secondary-container border-4" />
                    ) : (
                        <div className="rounded-full w-24 h-24 mr-4 bg-gray-400"></div>
                    )}
                </div>
                <div className="mb-8" onClick={onHome} >
                    <FaHome size={32}/>
                </div>
                <div className="mt-auto">
                    <div className="flex flex-col gap-4">
                        <button className="bg-primary-container text-on-primary-container py-2 px-4 rounded">Drafted Playlists</button>
                        <button className="bg-primary-container text-on-primary-container py-2 px-4 rounded">Created Playlists</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default Sidebar;
