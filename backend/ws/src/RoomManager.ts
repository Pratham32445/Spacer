import client from "./client";
import { Room } from "./Room";

export class RoomManager {
  rooms: Map<string, Room>;
  static Instance: RoomManager;
  constructor() {
    this.rooms = new Map();
  }
  static getInstance() {
    if (!this.Instance) {
      this.Instance = new RoomManager();
    }
    return this.Instance;
  }
  async getRoom(roomId: string) {
    if (!this.rooms.has(roomId)) {
      const isRoom = await client.space.findFirst({ where: { Id: roomId } });
      if (!isRoom) return;
      const newRoom = new Room(
        isRoom.Id!,
        isRoom.adminId!,
        isRoom.coverPhoto!,
        isRoom.title!,
        isRoom.desc!,
        isRoom.isPrivate!
      );
      this.rooms.set(roomId, newRoom);
    }
    return this.rooms.get(roomId);
  }
  async setRoom(roomId: string, room: Room) {
    this.rooms.set(roomId, room);
  }
}
