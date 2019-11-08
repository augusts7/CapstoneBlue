
import React from 'react';



const UserContext = React.createContext({
    "user": null,
    "user_type": "",
    "isLoggedIn": false,
    "token": ""
});

export default UserContext;