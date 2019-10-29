
import React from 'react';



const AuthContext = React.createContext({
    "login": (user) => { },
    "logout": () => { },
});

export default AuthContext;

