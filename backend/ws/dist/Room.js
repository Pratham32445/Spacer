"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const types_1 = require("./types");
class Room {
    constructor(RoomId, adminId, coverPhoto, title, desc, isPrivate = false) {
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
    addUser(userId, user) {
        if (this.isPrivate) {
            this.waitingUser.set(userId, user);
            return;
        }
        this.users.set(userId, user);
        user.ws.send(JSON.stringify({
            type: "CONNECTED",
            payload: {},
        }));
        this.syncNewUser(user);
    }
    removeUser(userId) {
        if (!this.users.has(userId))
            return;
        this.users.delete(userId);
    }
    addMessage(message, userId) {
        const user = this.users.get(userId);
        const Message = {
            message,
            userId,
            timeStamp: new Date(),
        };
        if (!user)
            return;
        this.messages.push(Message);
        this.broadCastMessage(Message);
    }
    addSong(songMetaData, adminId) {
        console.log(songMetaData, adminId);
        if (adminId != this.adminId)
            return;
        this.songQueue.push(songMetaData);
        this.broadCastQueueUpdate();
    }
    playNext(adminId) {
        if (adminId != this.adminId)
            return;
        if (this.songQueue.length > this.currentSongIdx) {
            this.currentSongIdx++;
            this.isPlaying = true;
        }
    }
    getCurrentState(me) {
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
                role: user.Id == this.adminId ? types_1.UserRole.ADMIN : types_1.UserRole.USER,
                isMe: user.Id == me.Id,
            })),
        };
    }
    syncNewUser(user) {
        const state = this.getCurrentState(user);
        user.ws.send(JSON.stringify({
            type: "ROOM_STATE",
            payload: state,
        }));
    }
    broadCastMessage(message) {
        this.broadCast({ type: "NEW_MESSAGE", message });
    }
    broadCastQueueUpdate() {
        this.broadCast({
            type: "QUEUE_UPDATE",
            payload: this.songQueue,
        });
    }
    broadCast(data) {
        const message = JSON.stringify(data);
        this.users.forEach((u) => u.ws.send(message));
    }
}
exports.Room = Room;
