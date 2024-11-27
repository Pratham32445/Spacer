import { NextFunction, Request, Response } from "express";
import client from "../client/indext";
import jwt from "jsonwebtoken";

interface Token {
  Id: string;
  isVerified: boolean;
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(403).json({ message: "unauthorized", type: "toast" });
      return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Token;
    const user = await client.user.findFirst({ where: { Id: decoded.Id } });
    if (!user)
      return res.status(401).json({
        message: "Unauthorized",
      });
    // @ts-ignore
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};
