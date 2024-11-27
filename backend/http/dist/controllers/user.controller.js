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
exports.signUp = void 0;
const types_1 = require("../types");
const indext_1 = __importDefault(require("../client/indext"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = types_1.authSchema.safeParse(req.body);
        if (results.success) {
            const { email, password } = req.body;
            const isUser = yield indext_1.default.user.findFirst({
                where: { email },
            });
            if (isUser) {
                return res
                    .status(401)
                    .json({ message: "User already exist", type: "toast" });
            }
            const user = yield indext_1.default.user.create({ data: { email, password } });
            // send email
            const token = jsonwebtoken_1.default.sign({ Id: user.Id, isVerified: false }, process.env.JWT_SECRET);
            res.cookie("authToken", token, {
                httpOnly: false,
                secure: false,
            });
            return res.status(201).json({
                message: "Account Created Successfully",
                type: "toast",
            });
        }
        return res.status(401).send({
            Errors: results.error,
            type: "showErrors",
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.signUp = signUp;
