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
exports.createRoom = void 0;
const types_1 = require("../types");
const indext_1 = __importDefault(require("../client/indext"));
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        req.body.adminId = req.user.Id;
        const results = types_1.Room.safeParse(req.body);
        if (!results.success) {
            return res.status(401).send({
                Errors: results.error,
                type: "showErrors",
            });
        }
        const space = yield indext_1.default.space.create({ data: req.body });
        return res.status(201).json({ message: "space Created", type: "toast" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createRoom = createRoom;
