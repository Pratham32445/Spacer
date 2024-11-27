import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password should be greater than 6 character"),
});

export const Room = z.object({
    title : z.string(),
    desc : z.string(),
}) 