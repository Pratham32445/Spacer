import { client } from "@/app/client";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email", placeholder: "Enter your email" },
        password: { type: "password", placeholder: "Enter your Password" },
      },
      async authorize(credentials) {
        const User = await client.user.findFirst({
          where: { email: credentials?.email },
        });
        return User;
      },
    }),
  ],
};
