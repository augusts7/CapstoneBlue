import React from "react";
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";
import App from "../BaseLayout/App/App";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";
import ForgotPassword from "../Authentication/ForgotPassword/ForgotPassword";
import ls from "local-storage";

import "./Application.css";

class Application extends React.Component {
    constructor(props) {
        super(props);

        var isLoggedIn = false;
        if (ls.get("isLoggedIn")) {
            isLoggedIn = true;
        }
        this.state = {
            isLoggedIn: isLoggedIn,
            user_type: "faculty"
        };
        this.hasLoggedIn = this.hasLoggedIn.bind(this);
    }

    hasLoggedIn(user) {
        this.setState({isLoggedIn: true});
        ls.set("isLoggedIn", true);
        ls.set("user_type", user.user_type);
    }

    getRoutes() {
        let login = <Login hasLoggedIn={this.hasLoggedIn}/>;
        let register = <Register hasLoggedIn={this.hasLoggedIn}/>;
        let app = <App id={1}/>;

        let routes = [];
        if (this.state.isLoggedIn) {
            routes.push(
                <Switch>
                    <Route path="/" render={() => app}/>
                </Switch>
            );
        } else {
            routes.push(
                <Switch>
                    <Route path="/login" render={() => login}/>
                    <Route path="/register" render={() => register}/>
                    <Route path="/forgotPassword" component={ForgotPassword}/>
                    <Route path="/" render={() => login}/>
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
