import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export const config = {
  matcher: ["/create"],
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });
  if (token) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/login", req.url));
}
