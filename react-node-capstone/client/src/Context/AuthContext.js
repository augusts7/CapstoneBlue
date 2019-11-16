
import React from 'react';



const AuthContext = React.createContext({
    "login": (user) => { },
    "logout": () => { },
    "getUser": () => {},
});

export default AuthContext;

