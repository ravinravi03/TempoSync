import React from 'react';
import { FaHome } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="bg-secondary text-white w-64 p-5 flex flex-col items-center">
            <div className="text-center mb-8">
                <img src="https://i.scdn.co/image/ab6775700000ee85fb587a288ed23dcfca4134db" alt="Profile" className="rounded-full w-24 h-24 mb-4" />
                <p className="text-xl">Ravin Ravi</p>
                <button className="bg-error-container text-white text-on-error-container py-2 px-4 rounded mt-4">Logout</button>
            </div>
            <div className="mb-8">
                <FaHome size={32} />
            </div>
            <div className="flex flex-col gap-4">
                <button className="bg-primary-container text-on-primary-container py-2 px-4 rounded">Drafted Playlists</button>
                <button className="bg-primary-container text-on-primary-container py-2 px-4 rounded">Created Playlists</button>
            </div>
        </div>
    );
}

export default Sidebar;
