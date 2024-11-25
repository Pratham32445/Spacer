import { Message, SongMetaData } from "./types";
import { User } from "./User";

export class Room {
  private Id: string;
  private users: Map<string, User>;
  private waiting: Map<string, User>;
  private Queue: SongMetaData[];
  private adminId: string;
  private Messages: Message[];
  private isPlaying: boolean;
  private isPrivate: boolean;
  private CurrentSongStartTime: number;
  private currentPosition: number;
  private currentSongIndex: number;

  constructor(Id: string, adminId: string, isPrivate = false) {
    this.Id = Id;
    this.adminId = adminId;
    this.isPrivate = isPrivate;
    this.users = new Map();
    this.Queue = [];
    this.Messages = [];
    this.waiting = new Map();
    this.isPlaying = true;
    this.currentPosition = 0;
    this.currentSongIndex = -1;
    this.CurrentSongStartTime = 0;
  }

  addUser(user: User) {
    if (this.isPrivate) {
      this.waiting.set(user.Id, user);
      return;
    }
    this.users.set(user.Id, user);
  }

  removeUser(Id: string) {
    const user = this.users.get(Id);
    if (user) {
      this.users.delete(Id);
    }
  }

  addSong(songMetadata: SongMetaData, Id: string) {
    if (Id == this.adminId) {
      this.Queue.push(songMetadata);
    }
  }

  removeSong(Id: string, index: number) {
    if (Id != this.adminId) return;
    if (index >= 0 && index < this.Queue.length) {
      this.Queue.slice(index, 1);
    }
  }

  tooglePlayBack(Id: string) {
    if (Id != this.adminId) return;
    this.isPlaying = !this.isPlaying;
  }

  addMessage(message: string, Id: string) {
    const user = this.users.get(Id);
    if (!user) return;
    const newMessage: Message = {
      message,
      userId: Id,
      time: new Date(),
    };
    this.Messages.push(newMessage);
    this.broadCastMessage(newMessage);
  }

  broadCastMessage(message: Message) {
    this.broadCast({
      type: "NEW_MESSAGE",
      payload: message,
    });
  }

  broadCast(data: any) {
    const message = JSON.stringify(data);
    this.users.forEach((u) => u.ws.send(message));
  }
}
