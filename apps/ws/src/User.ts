import { WebSocket } from "ws";
import { IncomingMessageData } from "./types";
import client from "@repo/db/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RoomManager } from "./RoomManager";
import { Room } from "./Room";

export class User {
  public ws: WebSocket;
  private userId: string;
  // @ts-ignore
  public Id: string;

  constructor(ws: WebSocket) {
    this.ws = ws;
    this.initHandler();
    this.userId = "";
  }

  initHandler() {
    this.ws.on("message", async (data) => {
      const parsedData: IncomingMessageData = JSON.parse(data.toString());
      switch (parsedData.type) {
        case "joinRoom":
          let roomId = parsedData.payload.roomId;

          let token = parsedData.payload.token;

          const { userId } = jwt.verify(
            token,
            process.env.JWT_SECRET!
          ) as JwtPayload;

          this.userId = userId;

          const isUser = await client.user.findFirst({ where: { Id: userId } });

          const isSpace = await client.space.findFirst({
            where: { Id: roomId },
          });

          if (!isUser || !isSpace || (isSpace && !isSpace.isActive)) {
            this.ws.close();
            return;
          }

          const room = await RoomManager.getInstance().getRoom(roomId);

          if (!room) return;

          room.addUser(this);

        default:
          break;
      }
    });
  }
}
