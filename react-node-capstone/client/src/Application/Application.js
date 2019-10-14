import React from "react";
import { Route, Redirect, Switch, BrowserRouter as Router } from "react-router-dom";
import App from "../BaseLayout/App/App";
import LoggedOutApp from "../Authentication/LoggedOutApp/LoggedOutApp";
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
        this.onLogout = this.onLogout.bind(this);
    }

    hasLoggedIn(user) {
        this.setState({ isLoggedIn: true });
        ls.set("isLoggedIn", true);
        ls.set("user_type", user.user_type);
    }

    onLogout() {
        this.setState({ isLoggedIn: false });
        ls.set("isLoggedIn", false);
        ls.set("user_type", "");
    }

    render() {

        let html = [];

        if (this.state.isLoggedIn) {

            html.push(<App onLogout={this.onLogout} />);

        } else {
            html.push(<LoggedOutApp hasLoggedIn={this.hasLoggedIn} />);
        }
        return (
            <div key="root" className="mdl-layout mdl-js-layout mdl-layout--fixed-header full root-container">
                {html}
            </div>
        );
    }
}

export default Application;
