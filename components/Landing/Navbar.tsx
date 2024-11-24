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
      <div className="flex items-center justify-between px-10 py-2 bg-transparent rounded-lg backdrop-blur-lg border shadow-lg">
        <div className="flex items-center">
          <MicVocal />
          <p className="ml-2 text-3xl font-bold">Spacer</p>
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
