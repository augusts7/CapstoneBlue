
import React from 'react';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ForgotPassword from "../ForgotPassword/ForgotPassword";

export default function LoggedOutApp (props) {

    let login = <Login hasLoggedIn={props.hasLoggedIn} />;
    let register = <Register hasLoggedIn={props.hasLoggedIn} />;
    let forgotPassword = <ForgotPassword hasLoggedIn={props.hasLoggedIn} />;

    return (
        <Router>
            <div key="root">
                <Switch>
                    <Route path="/login" render={() => login} />
                    <Route path="/register" render={() => register} />
                    <Route path="/forgotPassword" render={() => forgotPassword} />
                    <Route path="/" render={() => login} />
                </Switch>
            </div>
        </Router>
    );

}









