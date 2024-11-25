export interface IncomingMessageData {
  type: string;
  payload: any;
}

export interface Message {
  message: string;
  time: Date;
  userId: string;
}

export interface SongMetaData {
  url: string;
  title: string;
  duration: number;
  addedBy: string;
}
