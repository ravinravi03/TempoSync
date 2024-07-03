import React from 'react';
import { FaSpotify } from 'react-icons/fa';

const LoginBox = () => {

    const handleLogin = () => {
        window.location.href = 'http://localhost:5050/login/spotify';
    }

    const handleCreateAccount = () => {
        window.location.href = 'https://www.spotify.com/signup';
    }

    return (
        <div className="bg-primary text-white text-center py-12 px-8 mt-16 rounded-t-2xl shadow-md">
            <h2 className="text-3xl mb-8">Start Here</h2>
            <button onClick={handleLogin} className="bg-on-primary-container hover:bg-on-background text-white text-3xl font-bold py-3 px-6 rounded-lg inline-flex items-center mb-6">
                Login with Spotify
                <FaSpotify className="ml-2" />
            </button>
            <div className="flex items-center mb-6">
                <div className="border-t-2 border-white flex-grow"></div>
                <span className="text-3xl mx-4">or</span>
                <div className="border-t-2 border-white flex-grow"></div>
            </div>
            <button onClick={handleCreateAccount} className="bg-on-primary-container hover:bg-on-background text-white text-3xl font-bold py-3 px-6 rounded-lg">
                Create a Spotify Account
            </button>
        </div>
    );
}

export default LoginBox;
