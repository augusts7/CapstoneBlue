import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import App from "../BaseLayout/App/App"
import Login from '../Authentication/Login/Login'
import Register from '../Authentication/Register/Register'
import ForgotPassword from '../Authentication/ForgotPassword/ForgotPassword'

import "./Application.css";

class Application extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "isLoggedIn": true
        };
    }

    getRoutes() {
        let routes = [];
        if (this.state.isLoggedIn) {
            routes.push(<Switch><Route path="/" component={App} /></Switch>);
        } else {
            routes.push(
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/forgotPassword" component={ForgotPassword} />
                    <Route path="/" component={Login} />
                </Switch>
            );

        }
        return routes;
    }

    render() {
        return (
            <Router>
                <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header full root-container">

                    {this.getRoutes()}

                </div>
            </Router>
        );
    }
}

export default Application;