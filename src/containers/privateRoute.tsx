import React from 'react';
import { useAuthState } from '../contexts/authContext';

const PrivateRoute = () => {
    const auth = useAuthState();
    if(auth.profile) {
        return "auth screen";
    } 
    return (
        <div>
            
        </div>
    );
};

export default PrivateRoute;