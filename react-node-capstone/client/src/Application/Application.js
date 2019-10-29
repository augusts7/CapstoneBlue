import React from "react";
import ls from "local-storage";
import UserContext from "../Context/UserContext";
import AuthContext from "../Context/AuthContext";
import ApplicationRouter from "./ApplicationRouter";
import { get } from "../ApiHelper/ApiHelper";


class Application extends React.Component {

    constructor(props) {
        super(props);

        let isLoggedIn = ls.get("isLoggedIn", false);
        this.state = {
            "isLoggedIn": isLoggedIn,
            "user": null,
            "user_type": ls.get("user_type", "")
        };

    }

    authCtx = {

        "login": (user) => {
            this.setState({ "user": user, "isLoggedIn": true, "user_type": user.user_type});
            ls.set("user_type", user.user_type);
            ls.set("isLoggedIn", true);
        },
        "logout": () => {
            this.setState({ "user": null, "isLoggedIn": false, "user_type": "" });
            ls.set("user_type", "");
            ls.set("isLoggedIn", false);
        }

    };


    render() {

        let userContext = {"user": this.state.user, "user_type": this.state.user_type, "isLoggedIn": this.state.isLoggedIn};

        return (
            <AuthContext.Provider value={this.authCtx}>
                <UserContext.Provider value={userContext}>
                    <ApplicationRouter auth={this.state.isLoggedIn} />
                </UserContext.Provider>
            </AuthContext.Provider>
        );
    }
}


export default Application;