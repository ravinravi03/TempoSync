import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../../hooks/auth/useAuth';

const MainLayout = () => {
    useAuth();

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 bg-on-background overflow-auto">
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
