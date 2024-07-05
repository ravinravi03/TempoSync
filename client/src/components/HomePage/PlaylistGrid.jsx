import React from 'react';

const playlists = [
    { name: 'Paramore', image: 'path-to-image' },
    { name: 'Bruh', image: 'path-to-image' },
];

const PlaylistGrid = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 overflow-auto">
            {playlists.map((playlist, index) => (
                <div key={index} className="bg-secondary rounded-lg overflow-hidden text-center text-white">
                    <img src={playlist.image} alt={playlist.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <p>{playlist.name}</p>
                        <button className="bg-green-400 text-white py-1 px-2 rounded mt-2">+</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PlaylistGrid;
