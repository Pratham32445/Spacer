"use client";
import { MicVocal } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

const NavbarInfo = [
  { name: "Create", link: "/hello" },
  { name: "About us", link: "/hello" },
  { name: "Blogs", link: "/hello" },
  { name: "Features", link: "/hello" },
  { name: "Policy", link: "/hello" },
];

const Navbar = () => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-2 left-0 w-full z-50"
    >
      <div className="flex items-center max-w-5xl mx-auto px-4 py-2 bg-transparent border rounded-lg backdrop-blur-lg shadow-lg">
        <div className="flex items-center">
          <MicVocal />
          <p className="ml-2">Spacer</p>
        </div>
        <div className="w-full mx-10 flex justify-around">
          {NavbarInfo.map(({ link, name }, idx) => (
            <div key={idx}>
              <Link href={link}>
                <p className="text-sm font-light text-white hover:text-gray-300">
                  {name}
                </p>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex gap-6">
          <Link href={"/login"}>
            <Button>Login</Button>
          </Link>
          <Link href={"/docs"}>
            <Button>Docs</Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
