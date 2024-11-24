"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MicVocal, ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Login = () => {
  const AuthLogin = (type: string) => {
    console.log(type);
    switch (type) {
      case "google":
        signIn("google", {
          callbackUrl: "/explore",
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-[350px]  flex justify-center flex-col items-center">
        <div className="flex justify-center flex-col items-center">
          <MicVocal width={40} height={50} />
          <p className="z-10 text-2xl font-medium tracking-tighter  dark:text-white text-center py-6">
            What's your Email Address
          </p>
        </div>
        <div className="w-full">
          <Input
            className="p-6 my-3"
            type="email"
            placeholder="Enter your email address..."
          />
          <Link href={"/signup"}>
            <Button className="bg-lightPurple hover:bg-darkPurple border border-borderPurple p-6 text-white w-full shadow-custom">
              Continue with email
            </Button>
          </Link>
          <p className="text-center p-4 text-neutral-500">or</p>
          <div className="flex flex-col gap-4">
            <Button
              onClick={() => AuthLogin("google")}
              className="p-6 shadow-custom bg-[#1E2025] hover:bg-[#272a31] border border-authBorder text-white"
            >
              Continue with Google
            </Button>
            <Button className="p-6 shadow-custom bg-[#1E2025] hover:bg-[#272a31] border border-authBorder text-white">
              Continue with Github
            </Button>
          </div>
          <p className="text-sm text-neutral-400 py-5 text-center">
            By signing up,you agree to our
            <span className="text-white font-bold"> Terms and conditions </span>
          </p>
          <p className="text-neutral-400 flex items-center justify-center gap-2">
            Create new account ?{" "}
            <Link
              className="text-white font-bold flex items-center"
              href={"/signup"}
            >
              Signup
              <ArrowRight width={20} height={20} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
