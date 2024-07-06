import React from 'react';

const PlaylistModal = ({ isOpen, onClose, playlist }) => {




  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-tertiary p-8 rounded-lg w-1/3 h-1/3 flex flex-col relative">
        <div className='flex items-center justify-between'>
          <h2 className="text-white text-2xl mb-4">{playlist.name}</h2>
          <button className="text-white absolute top-8 right-8" onClick={onClose}>
            x
          </button>
        </div>
  
        <p className="text-white mb-4 text-center">Select a Tempo Range</p>
        <div className="flex items-center justify-center mb-4">
          <input type="number" className="w-16 p-2 text-center text-black rounded" defaultValue={80} />
          <span className="text-white mx-4">to</span>
          <input type="number" className="w-16 p-2 text-center text-black rounded" defaultValue={120} />
        </div>
        
        <div className="flex justify-center gap-8 mt-auto">
          <button className="bg-tertiary-container text-on-tertiary-container py-2 px-4 rounded" onClick={() => console.log('Create Playlist')}>
            Create
          </button>
          <button className="bg-tertiary-container text-on-tertiary-container py-2 px-4 rounded" onClick={() => console.log('Add to Drafts')}>
            Add to Drafts
          </button>
        </div>
      </div>
    </div>
  );
  
  
};

export default PlaylistModal;
