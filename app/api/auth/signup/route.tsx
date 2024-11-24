import { client } from "@/app/client";
import { NextRequest, NextResponse } from "next/server";
import { signupSchema } from "../../types";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();
    if (!email || !password)
      return NextResponse.json(
        { message: "Please send all the fields", type: "userError" },
        { status: 401 }
      );
    const result = signupSchema.safeParse({ email, password });
    if (!result.success) {
      return NextResponse.json(
        {
          Errors: result.error.errors.reduce((acc, e) => {
            acc[e.path[0]] = e.message;
            return acc;
          }, {} as Record<string, string>),
          type: "propertyError",
        },
        { status: 401 }
      );
    }
    const isUser = await client.user.findFirst({ where: { email } });
    if (isUser)
      return NextResponse.json(
        { message: "User already exist", type: "userError" },
        { status: 401 }
      );
    // send  email
    const isEmailSend = true;
    if (isEmailSend) {
      const User = await client.user.create({
        data: {
          email,
          password,
          isVerified: true,
        },
      });
      return NextResponse.json(
        { User, message: "Congrats..." },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);
    NextResponse.json(
      { message: "Internal Server Error", type: "userError" },
      { status: 401 }
    );
  }
};
