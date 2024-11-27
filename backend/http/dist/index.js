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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const rooms_routes_1 = __importDefault(require("./routes/rooms.routes"));
const cors_1 = __importDefault(require("cors"));
const ytdl_core_1 = __importDefault(require("ytdl-core"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/user", user_routes_1.default);
app.use("/api/v1/room", rooms_routes_1.default);
app.post("/song/info", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url } = req.body;
        if (!url)
            return;
        const info = yield ytdl_core_1.default.getInfo(url);
        const title = info.videoDetails.title;
        const duration = parseInt(info.videoDetails.lengthSeconds, 10);
        res.json({ title, duration });
    }
    catch (error) {
        console.log(error);
        res.status(401).send("Please send valid url");
    }
}));
app.listen(process.env.PORT, () => {
    console.log("running");
});
