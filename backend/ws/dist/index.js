"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const User_1 = require("./User");
const wss = new ws_1.WebSocketServer({ port: 3001 });
wss.on("connection", (ws) => {
    console.log("user connected");
    let user = new User_1.User(ws);
});
