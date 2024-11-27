import { Request, Response } from "express";
import { authSchema, Room } from "../types";
import client from "../client/indext";

export const createRoom = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    req.body.adminId = req.user.Id;
    const results = Room.safeParse(req.body);
    if (!results.success) {
      return res.status(401).send({
        Errors: results.error,
        type: "showErrors",
      });
    }
    const space = await client.space.create({ data: req.body });
    return res.status(201).json({ message: "space Created", type: "toast" });
  } catch (error) {
    console.log(error);
  }
};
