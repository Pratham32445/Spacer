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
      let roomId, room, userId, token;
      switch (parsedData.type) {
        case "JOIN_ROOM":
          roomId = parsedData.payload.roomId;
          token = parsedData.payload.token;
          userId = (jwt.verify(token, JWT_PASSWORD) as JwtPayload).Id;
          this.Id = userId;
          if (!userId) return;
          room = await RoomManager.getInstance().getRoom(roomId);
          if (!room) return;
          room.addUser(this.Id, this);
          RoomManager.getInstance().setRoom(roomId, room);
          break;
        case "ADD_SONG":
          roomId = parsedData.payload.roomId;
          room = await RoomManager.getInstance().getRoom(roomId);
          room?.addSong(
            parsedData.payload.songMetaData,
            parsedData.payload.adminId
          );
          console.log(RoomManager.getInstance().rooms);
          break;
        case "ADD_MESSAGE":
          roomId = parsedData.payload.roomId;
          token = parsedData.payload.token;
          room = await RoomManager.getInstance().getRoom(roomId);
          userId = (jwt.verify(token, JWT_PASSWORD) as JwtPayload).Id;
          room?.addMessage(parsedData.payload.message, userId);
          break;
        default:
          break;
      }
    });
  }
}
