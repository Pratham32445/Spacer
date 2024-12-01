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
exports.RoomManager = void 0;
const client_1 = __importDefault(require("./client"));
const Room_1 = require("./Room");
class RoomManager {
    constructor() {
        this.rooms = new Map();
    }
    static getInstance() {
        if (!this.Instance) {
            this.Instance = new RoomManager();
        }
        return this.Instance;
    }
    getRoom(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.rooms.has(roomId)) {
                const isRoom = yield client_1.default.space.findFirst({ where: { Id: roomId } });
                if (!isRoom)
                    return;
                const newRoom = new Room_1.Room(isRoom.Id, isRoom.adminId, isRoom.coverPhoto, isRoom.title, isRoom.desc, isRoom.isPrivate);
                this.rooms.set(roomId, newRoom);
            }
            return this.rooms.get(roomId);
        });
    }
    setRoom(roomId, room) {
        return __awaiter(this, void 0, void 0, function* () {
            this.rooms.set(roomId, room);
        });
    }
}
exports.RoomManager = RoomManager;
