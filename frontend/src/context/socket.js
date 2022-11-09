import React from "react";
import socketio from "socket.io-client";
import { SOCKET_URL } from "../utils/configs";

// export const socket = socketio.connect(SOCKET_URL);

export const socket = socketio(SOCKET_URL, {
  transports: ["websocket"],
});
export const SocketContext = React.createContext();
