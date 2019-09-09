import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from "../BaseLayout/App/App"
import Login from '../Authentication/Login/Login'
import Register from '../Authentication/Register/Register'
import ForgotPassword from '../Authentication/ForgotPassword/ForgotPassword'

import "./Application.css";

class Application extends React.Component { 

    render() {
        return (
            <Router>
                <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header full root-container">
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/forgotPassword" component={ForgotPassword} />
                    <Route exact path="/" component={App} />
                </div>
            </Router>
        );
    }
}

export default Application;