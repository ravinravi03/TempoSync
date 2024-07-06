import React, {useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../../hooks/auth/useAuth';
import { useAppContext } from '../../AppContextProvider';
import { useGetUserProfile } from '../../hooks/useGetUserProfile';
import { getCookie } from '../../utilities/cookieUtils';

const MainLayout = () => {
    const {getUserProfile, isLoading, error} = useGetUserProfile();
    const {setUserProfile} = useAppContext();

    useAuth();

    useEffect(() => {
        getUserProfile(getCookie('accessToken'))
            .then(result => {
                setUserProfile(result);
            })
            .catch(error => {
                console.error("Error occurred", error);

                if (error.response && error.response.status === 404) {
                    setUserProfile([]);
                }
            });
    }, []);

    return (
        <div className="flex h-screen bg-on-background">
            <Sidebar />
            <div className="flex-1 bg-on-background overflow-auto">
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
