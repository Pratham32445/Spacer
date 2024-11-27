import { WebSocket } from "ws";
import { RoomManager } from "./RoomManager";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

export class User {
  public ws: WebSocket;
  public Id: string;
  public name: string;
  constructor(ws: WebSocket) {
    this.ws = ws;
    this.Id = "";
    this.name = "Anonyms";
    this.initHandler();
  }
  initHandler() {
    this.ws.on("message", async (data) => {
      const parsedData = JSON.parse(data.toString());
      let roomId, room;
      switch (parsedData.type) {
        case "JOIN_ROOM":
          roomId = parsedData.payload.roomId;
          const token = parsedData.payload.token;
          const userId = (jwt.verify(token, JWT_PASSWORD) as JwtPayload).Id;
          this.Id = userId;
          if (!userId) return;
          room = await RoomManager.getInstance().getRoom(roomId);
          if (!room) return;
          room.addUser(this.Id, this);
          break;
        case "ADD_SONG":
          roomId = parsedData.payload.roomId;
          room = await RoomManager.getInstance().getRoom(roomId);
          room?.addSong(
            parsedData.payload.songMetaData,
            parsedData.payload.adminId
          );
          console.log(RoomManager.getInstance().rooms);
        default:
          break;
      }
    });
  }
}
