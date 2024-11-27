import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddlware";
import { createRoom } from "../controllers/room.controller";

const roomRouter = Router();

roomRouter.post("/create",isAuthenticated,createRoom);

export default roomRouter;
