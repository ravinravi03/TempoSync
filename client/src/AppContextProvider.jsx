import React, { createContext, useState, useContext, useRef } from 'react';
import { useLocalStorage } from './utilities/localStorage';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useLocalStorage('userProfile',null);

    const contextValue = {
        userProfile,
        setUserProfile
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};