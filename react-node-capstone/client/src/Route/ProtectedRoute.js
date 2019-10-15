

import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute(props) {


    console.log("Protected route." + props.component + " auth = " + props.auth);

    return <Route {...props} render={(props) => getLayout(props)} />
}

function getLayout(props) {

    if (props.auth === true) {
        console.log("protected route return comp ");
        return (<props.component {...props} />);
    } else {
        console.log("protected route return redirect ");

        return (<Redirect to={{pathname: "/login"}} />);
    }

}

const protectedRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth === true
            ? <Component {...props} />
            : <Redirect to="/login" />
    )} />
)

export default ProtectedRoute;