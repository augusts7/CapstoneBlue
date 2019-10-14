
import React from 'react';



export const defaultAuthData = {
    "isLoggedIn": false,
    "user_type": null,
    "user": null
};

export const AuthContext = React.createContext(
    defaultAuthData 
);