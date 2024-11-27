import { atom } from "recoil";

export const userSocket = atom<WebSocket | null>({
  key: "userSocket",
  default: null,
});

export const connectedUsers = atom({
  key: "connectedUsers",
  default: [],
});

export const adminId = atom<string | null>({
  key: "adminId",
  default: null,
});
