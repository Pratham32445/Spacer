import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddlware";
import { createRoom } from "../controllers/room.controller";


const roomRouter = Router();


// @ts-ignore
roomRouter.post("/create",isAuthenticated,createRoom);

export default roomRouter;
