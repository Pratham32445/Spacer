"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const RoomManager_1 = require("./RoomManager");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
class User {
    constructor(ws) {
        this.ws = ws;
        this.Id = "";
        this.name = "Anonyms";
        this.initHandler();
    }
    initHandler() {
        this.ws.on("message", (data) => __awaiter(this, void 0, void 0, function* () {
            const parsedData = JSON.parse(data.toString());
            let roomId, room;
            switch (parsedData.type) {
                case "JOIN_ROOM":
                    roomId = parsedData.payload.roomId;
                    const token = parsedData.payload.token;
                    const userId = jsonwebtoken_1.default.verify(token, config_1.JWT_PASSWORD).Id;
                    this.Id = userId;
                    if (!userId)
                        return;
                    room = yield RoomManager_1.RoomManager.getInstance().getRoom(roomId);
                    if (!room)
                        return;
                    room.addUser(this.Id, this);
                    break;
                case "ADD_SONG":
                    roomId = parsedData.payload.roomId;
                    room = yield RoomManager_1.RoomManager.getInstance().getRoom(roomId);
                    room === null || room === void 0 ? void 0 : room.addSong(parsedData.payload.songMetaData, parsedData.payload.adminId);
                    console.log(RoomManager_1.RoomManager.getInstance().rooms);
                default:
                    break;
            }
        }));
    }
}
exports.User = User;
