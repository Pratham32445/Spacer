import { WebSocketServer } from "ws";
import { User } from "./User";

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", (ws) => {
  console.log("user connected");
  let user = new User(ws);
});
