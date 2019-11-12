import React from "react";
import ls from "local-storage";
import UserContext from "../Context/UserContext";
import AuthContext from "../Context/AuthContext";
import ApplicationRouter from "./ApplicationRouter";
import {connectSocket} from "../ApiHelper/Socket";
import SocketContext from "../Context/SocketContext";


class Application extends React.Component {

    constructor(props) {
        super(props);

        let isLoggedIn = ls.get("isLoggedIn", false);
        this.state = {
            "isLoggedIn": isLoggedIn,
            "user": null,
            "user_type": ls.get("user_type", ""),
            "token": ls.get("token", "")
        };
    }

    authCtx = {

        "login": (user) => {
            this.setState({"user": user, "isLoggedIn": true, "user_type": user.user_type, token: user.token});
            ls.set("user_type", user.user_type);
            ls.set("token", user.token);
            ls.set("isLoggedIn", true);
        },
        "logout": () => {
            this.setState({"user": null, "isLoggedIn": false, "user_type": ""});
            ls.set("user_type", "");
            ls.set("isLoggedIn", false);
            ls.set("token", "");
        }

    };

    getSocket = () => {
        if (this.state.token !== undefined && this.state.token !== null && this.state.token.length > 0) {
            if (this.socket === undefined || this.socket === null) {
                this.socket = connectSocket(this.state.token);
            }
            return this.socket;
        } else {
            return null;
        }
    };

    componentDidMount() {
        this.socket = this.getSocket();
    }


    render() {

        let userContext = {
            "user": this.state.user,
            "user_type": this.state.user_type,
            "isLoggedIn": this.state.isLoggedIn,
            "token": this.state.token
        };

        const socket = {socket: this.getSocket()};

        return (
            <AuthContext.Provider value={this.authCtx}>
                <UserContext.Provider value={userContext}>
                    <SocketContext.Provider value={socket}>
                        <ApplicationRouter auth={this.state.isLoggedIn}/>
                    </SocketContext.Provider>
                </UserContext.Provider>
            </AuthContext.Provider>
        );
    }
}


export default Application;