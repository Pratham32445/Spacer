import { WebSocket } from "ws";
import client from "@repo/db/client";

export class User {
  private ws: WebSocket;
  constructor(ws: WebSocket) {
    this.ws = ws;
  }
  initHandlers() {
    this.ws.on("message", (data) => {
      console.log(JSON.parse(data.toString()));
    });
  }
}
