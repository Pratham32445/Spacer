"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const userRouter = (0, express_1.Router)();
// @ts-ignore
userRouter.post("/signup", user_controller_1.signUp);
exports.default = userRouter;
