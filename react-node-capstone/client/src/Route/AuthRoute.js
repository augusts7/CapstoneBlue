

import React from "react";
import { Route, Redirect } from "react-router-dom";

function AuthRoute(props) {


    console.log("Auth Route. auth = " + props.auth);

    return <Route {...props} render={(props) => getLayout(props)} />
}

function getLayout(props) {

    if (props.auth === false) {
        console.log("auth Route return comp ");
        return (<props.component {...props} />);
    } else {
        console.log("auth Route return redirect ");

        return (<Redirect to={{pathname: "/"}} />);
    }
  
}

// eslint-disable-next-line
const authRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth === false
            ? <Component {...props} />
            : <Redirect to="/" />
    )} />
)


export default AuthRoute;