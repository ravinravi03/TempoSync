import React from 'react';
import PlaylistGrid from './PlaylistGrid';

const HomePage = () => {
    return (
        <div className="p-6 text-white">
            <h1 className="text-2xl mb-6 text-center">Select a Playlist to Filter</h1>
            <PlaylistGrid />
        </div>
    );
}

export default HomePage;
