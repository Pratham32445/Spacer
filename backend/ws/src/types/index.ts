export interface songMetaData {
  url: string;
  title: string;
  duration: number;
  addedBy?: string;
}

export interface Message {
  message: string;
  userId: string;
  timeStamp: Date;
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface RoomState {
  Id: string;
  adminId: string;
  isPrivate: boolean;
  isPlaying: boolean;
  queue: songMetaData[];
  users: Array<{ id: string; name: string; role: UserRole; isMe: boolean }>;
  message: Message[];
  isAdmin: boolean;
  coverPhoto : string;
  title : string;
  desc : string;
}
