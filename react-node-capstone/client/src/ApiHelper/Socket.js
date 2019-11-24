import React from "react";
import SocketClient from "socket.io-client";

export function connectSocket(token) {

    if (token === undefined || token === null) {
        return;
    }

    const socket = SocketClient("http://localhost:8080/");
    socket.emit("subscribe", token);

    return socket;
}
