import { Router } from "express";
import { signUp } from "../controllers/user.controller";

const userRouter = Router();

// @ts-ignore
userRouter.post("/signup", signUp);

export default userRouter;
