"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = exports.authSchema = void 0;
const zod_1 = require("zod");
exports.authSchema = zod_1.z.object({
    email: zod_1.z.string().email("Enter a valid email address"),
    password: zod_1.z.string().min(6, "Password should be greater than 6 character"),
});
exports.Room = zod_1.z.object({
    title: zod_1.z.string(),
    desc: zod_1.z.string(),
});
