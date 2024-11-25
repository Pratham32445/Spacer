import { Room } from "./Room";
import client from "@repo/db/client";

export class RoomManager {
  private rooms: Map<string, Room> = new Map();
  static instance: RoomManager;

  static getInstance() {
    if (!this.instance) {
      this.instance = new RoomManager();
    }
    return this.instance;
  }

  async getRoom(roomId: string) {
    if (!this.rooms.has(roomId)) {
      const room = await client.space.findFirst({
        where: { Id: roomId },
      });
      const newRoom = new Room(roomId, room?.adminId!);
      this.rooms.set(roomId, newRoom);
      return newRoom;
    }
    return this.rooms.get(roomId);
  }
}
