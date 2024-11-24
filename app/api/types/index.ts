import {z} from "zod";

export const signupSchema = z.object({
    email : z.string().email("Please give a valid email address"),
    password : z.string().min(6,"Password should be greater than 6 digits")
})