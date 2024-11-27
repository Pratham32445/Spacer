import { Request, Response } from "express";
import { authSchema } from "../types";
import client from "../client/indext";
import jwt from "jsonwebtoken";

export const signUp = async (req: Request, res: Response) => {
  try {
    const results = authSchema.safeParse(req.body);
    if (results.success) {
      const { email, password } = req.body;
      const isUser = await client.user.findFirst({
        where: { email },
      });
      if (isUser) {
        return res
          .status(401)
          .json({ message: "User already exist", type: "toast" });
      }
      const user = await client.user.create({ data: { email, password } });
      // send email
      const token = jwt.sign(
        { Id: user.Id, isVerified: false },
        process.env.JWT_SECRET!
      );

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
  } catch (error) {
    console.log(error);
  }
};
