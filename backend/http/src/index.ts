import express, { Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes";
import cookiePraser from "cookie-parser";
import roomRouter from "./routes/rooms.routes";
import cors from "cors";
import ytdl from "ytdl-core";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookiePraser());

app.use(express.json());

app.use("/api/v1/user", userRouter);

app.use("/api/v1/room", roomRouter);

app.post("/song/info", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return;
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;
    const duration = parseInt(info.videoDetails.lengthSeconds, 10);
    res.json({ title, duration });
  } catch (error) {
    console.log(error);
    res.status(401).send("Please send valid url");
  }
});

app.listen(process.env.PORT!, () => {
  console.log("running");
});
