import client from "./client";
import { Message, RoomState, songMetaData, UserRole } from "./types";
import { User } from "./User";

export class Room {
  private RoomId: string;
  private adminId: string;
  private coverPhoto: string;
  private title: string;
  private desc: string;
  private users: Map<string, User>;
  private isPrivate: boolean;
  private waitingUser: Map<string, User>;
  private messages: Message[];
  private songQueue: songMetaData[];
  private isPlaying: boolean;
  private currentSongIdx: number;
  private currentSongStartTime: number;
  constructor(
    RoomId: string,
    adminId: string,
    coverPhoto: string,
    title: string,
    desc: string,
    isPrivate = false
  ) {
    this.RoomId = RoomId;
    this.adminId = adminId;
    this.coverPhoto = coverPhoto;
    this.title = title;
    this.desc = desc;
    this.users = new Map();
    this.waitingUser = new Map();
    this.isPrivate = isPrivate;
    this.messages = [];
    this.isPlaying = true;
    this.songQueue = [];
    this.currentSongIdx = -1;
    this.currentSongStartTime = 0;
  }
  addUser(userId: string, user: User) {
    if (this.isPrivate) {
      this.waitingUser.set(userId, user);
      return;
    }
    this.users.set(userId, user);
    user.ws.send(
      JSON.stringify({
        type: "CONNECTED",
        payload: {},
      })
    );
    this.syncNewUser(user);
  }

  removeUser(userId: string) {
    if (!this.users.has(userId)) return;
    this.users.delete(userId);
  }

  addMessage(message: string, userId: string) {
    const user = this.users.get(userId);
    const Message: Message = {
      message,
      userId,
      timeStamp: new Date(),
    };
    if (!user) return;
    this.messages.push(Message);
    this.broadCastMessage(Message);
  }

  addSong(songMetaData: songMetaData, adminId: string) {
    console.log(songMetaData, adminId);
    if (adminId != this.adminId) return;
    this.songQueue.push(songMetaData);
    this.broadCastQueueUpdate();
  }

  playNext(adminId: string) {
    if (adminId != this.adminId) return;
    if (this.songQueue.length > this.currentSongIdx) {
      this.currentSongIdx++;
      this.isPlaying = true;
    }
  }

  getCurrentState(me: User): RoomState {
    return {
      Id: this.RoomId,
      adminId: this.adminId,
      isPlaying: this.isPlaying,
      isPrivate: this.isPrivate,
      message: this.messages,
      queue: this.songQueue,
      isAdmin: this.adminId == me.Id,
      coverPhoto: this.coverPhoto,
      title: this.title,
      desc: this.desc,
      users: Array.from(this.users.values()).map((user) => ({
        id: user.Id,
        name: user.name,
        role: user.Id == this.adminId ? UserRole.ADMIN : UserRole.USER,
        isMe: user.Id == me.Id,
      })),
    };
  }

  syncNewUser(user: User) {
    const state = this.getCurrentState(user);
    user.ws.send(
      JSON.stringify({
        type: "ROOM_STATE",
        payload: state,
      })
    );
  }
  broadCastMessage(message: Message) {
    this.broadCast({ type: "NEW_MESSAGE", message });
  }
  broadCastQueueUpdate() {
    this.broadCast({
      type: "QUEUE_UPDATE",
      payload: this.songQueue,
    });
  }
  broadCast(data: any) {
    const message = JSON.stringify(data);
    this.users.forEach((u) => u.ws.send(message));
  }
}
