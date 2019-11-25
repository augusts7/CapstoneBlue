import React from "react";
import SocketClient from "socket.io-client";
import ls from "local-storage";
import EnvironmentConstants from "../Environment/EnvironmentConstants";

export function connectSocket(token) {

    if (token === undefined || token === null) {
        return;
    }

    const socket = SocketClient(EnvironmentConstants.SERVER_URL);
    socket.emit("subscribe", token);

    return socket;
}

export default class SocketHelper {

    static token = ls.get("token", "");

    static getSocket () {
        const socket = SocketClient(EnvironmentConstants.SERVER_URL);
        socket.emit("subscribe", this.token);

        return socket;
    }
}
