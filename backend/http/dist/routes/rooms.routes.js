"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddlware_1 = require("../middlewares/authMiddlware");
const room_controller_1 = require("../controllers/room.controller");
const roomRouter = (0, express_1.Router)();
roomRouter.post("/create", authMiddlware_1.isAuthenticated, room_controller_1.createRoom);
exports.default = roomRouter;
