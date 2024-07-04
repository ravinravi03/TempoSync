import React from 'react';
import { useAuth } from '../../hooks/auth/useAuth';

const AuthTestComponent = () => {
    useAuth();

    return (
        <div>
            <h1>Testing Auth Flow</h1>
            <p>This component tests the useAuth hook.</p>
        </div>
    );
};

export default AuthTestComponent;
