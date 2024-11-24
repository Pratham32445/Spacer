"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MicVocal, ArrowRight, LoaderCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { UserError } from "../../types";
import { useToast } from "@/hooks/use-toast";
import type { ConfettiRef } from "@/components/ui/confetti";
import Confetti from "@/components/ui/confetti";
import { useRouter } from "next/navigation";

const AuthLogin = (type: string) => {
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
const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [Errors, setErrors] = useState<UserError>({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const confettiRef = useRef<ConfettiRef>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const navigate = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setErrors({ email: "", password: "" });
      setIsLoading(true);
      const res = await axios.post("/api/auth/signup", { email, password });
      setIsLoading(false);
      let isLoggedIn = null;
      if (res.data) {
        isLoggedIn = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
        if (isLoggedIn) {
          toast({
            title: res.data.message,
          });
          setShowConfetti(true);
          confettiRef.current?.fire({});
          setTimeout(() => {
            navigate.push("/explore");
          }, 2000);
          return;
        }
      }
      toast({
        title: "Some error occured",
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      if (error instanceof AxiosError && error.response?.data) {
        const type = error.response.data.type;
        if (type == "propertyError") {
          setErrors(error.response.data.Errors);
        } else {
          toast({
            variant: "destructive",
            title: error.response.data.message,
            duration: 1000 * 5,
          });
        }
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      {!isLoading ? (
        <div className="w-[350px]  flex justify-center flex-col items-center">
          <div className="flex justify-center flex-col items-center">
            <MicVocal width={40} height={50} />
            <p className="z-10 text-2xl font-medium tracking-tighter  dark:text-white text-center py-6">
              Create your Account
            </p>
          </div>
          <div className="w-full">
            <div>
              <form onSubmit={handleSignup} className="w-full">
                <Input
                  className="p-6 my-1"
                  type="email"
                  placeholder="Enter your email address..."
                  onChange={(e) => setEmail(e.target.value!)}
                  value={email}
                />
                {Errors && Errors.email && (
                  <p className="text-xs my-1 text-red-500">{Errors.email}</p>
                )}
                <Input
                  className="p-6 my-2"
                  type="password"
                  placeholder="Enter your password..."
                  onChange={(e) => setPassword(e.target.value!)}
                  value={password}
                />
                {Errors && Errors.password && (
                  <p className="text-xs my-2 text-red-500">{Errors.password}</p>
                )}
                <Button
                  type="submit"
                  className="p-6 mt-4 shadow-custom w-full bg-lightPurple hover:bg-darkPurple border border-authBorder text-white"
                >
                  Create Account
                </Button>
              </form>
            </div>
            <p className="text-center p-4 text-neutral-500">or</p>
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => AuthLogin("google")}
                className="p-6 shadow-custom bg-[#1E2025] hover:bg-[#272a31] border border-authBorder text-white"
              >
                Continue with Google
              </Button>
              <Button
                onClick={() => AuthLogin("github")}
                className="p-6 shadow-custom bg-[#1E2025] hover:bg-[#272a31] border border-authBorder text-white"
              >
                Continue with Github
              </Button>
            </div>
            <p className="text-sm text-neutral-400 py-5 text-center">
              By signing up,you agree to our
              <span className="text-white font-bold">
                {" "}
                Terms and conditions{" "}
              </span>
            </p>
            <p className="text-neutral-400 flex items-center justify-center gap-2">
              Already have an account ?{" "}
              <Link
                className="text-white font-bold flex items-center"
                href={"/login"}
              >
                Login
                <ArrowRight width={20} height={20} />
              </Link>
            </p>
          </div>
          {showConfetti && (
            <Confetti className="absolute left-0 top-0 z-0 size-full" />
          )}
        </div>
      ) : (
        <div>
          <LoaderCircle className="animate-spin w-8 h-8" />
        </div>
      )}
    </div>
  );
};

export default Signup;
