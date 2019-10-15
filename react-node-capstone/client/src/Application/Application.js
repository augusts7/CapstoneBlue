import React from "react";
import ls from "local-storage";
import { UserContext } from "../Context/UserContext";
import { AuthContext } from "../Context/AuthContext";
import ApplicationRouter from "./ApplicationRouter";



class Application extends React.Component {

    constructor(props) {
        super(props);

        var isLoggedIn = false;
        if (ls.get("isLoggedIn")) {
            isLoggedIn = true;
        }
        this.state = {
            "isLoggedIn": isLoggedIn,
            "user": null,
            "user_type": "faculty"
        };

    }


    authCtx = {

        "login": (user) => {
            this.setState({ "user": user, "isLoggedIn": true, "user_type": user.user_type });
            ls.set("isLoggedIn", true);
            ls.set("user_type", user.user_type);
        },
        "logout": () => {
            this.setState({ "user": null, "isLoggedIn": false, "user_type": null });
            ls.set("isLoggedIn", false);
            ls.set("user_type", "");
        }

    }


    render() {

        let userCtx = { "user": this.state.user, "user_type": this.state.user_type, "isLoggedIn": this.state.isLoggedIn };       

        return (
            <AuthContext.Provider value={this.authCtx}>
                <UserContext.Provider value={userCtx}>
                    <ApplicationRouter auth={this.state.isLoggedIn} />
                </UserContext.Provider>
            </AuthContext.Provider>
        );
    }
}


export default Application;