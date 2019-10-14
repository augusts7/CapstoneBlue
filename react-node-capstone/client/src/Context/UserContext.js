
import React from 'react';



export const defaultUserData = {
    "campusEmail": null,
    "firstName": null,
    "lastName": null
};

export const UserContext = React.createContext(
    defaultUserData 
);