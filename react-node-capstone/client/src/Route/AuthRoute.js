

import React from "react";
import { Route, Redirect } from "react-router-dom";

function AuthRoute(props) {


    console.log("Auth route. auth = " + props.auth);

    return <Route {...props} render={(props) => getLayout(props)} />
}

function getLayout(props) {

    if (props.auth == false) {
        console.log("auth route return comp ");
        return (<props.component {...props} />);
    } else {
        console.log("auth route return redirect ");

        return (<Redirect to={{pathname: "/"}} />);
    }
  
}

const authRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth == false
            ? <Component {...props} />
            : <Redirect to="/" />
    )} />
)


export default AuthRoute;