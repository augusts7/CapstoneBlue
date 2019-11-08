let io = null;
const tokens = require("../tokens/tokens");

function initSocket(server) {

    io = require("socket.io")(server);

    io.on('connection', function (socket) {

        socket.on("subscribe", function (roomName) {
            socket.join(roomName);
        });

        socket.on("unsubscribe", function (roomName) {
            socket.leave(roomName, function () {

            });
        });

        console.log("Socket has connected. Socket id = " + socket.id);

        socket.on('disconnect', function () {
            console.log("Socket has disconnected. Socket id = " + socket.id);
        });
    });
}

function getIO () {
    return io;
}

function broadcastToUser(userId, broadcastName, broadcastData) {
    console.log("Broadcast");
    let roomId = tokens.encode(userId);
    io.to(roomId).emit(broadcastName, broadcastData);
}

module.exports = {
    initSocket,
    getIO,
    broadcastToUser
};