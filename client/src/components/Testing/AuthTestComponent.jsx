import React from 'react';
import { useAuth } from '../../hooks/auth/useAuth';

const AuthTestComponent = () => {
    useAuth();

    return (
        <div>
        </div>
    );
};

export default AuthTestComponent;
