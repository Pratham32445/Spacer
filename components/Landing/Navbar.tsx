import { MicVocal } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const NavbarInfo = [
  {
    name: "Create",
    link: "/hello",
  },
  {
    name: "About us",
    link: "/hello",
  },
  {
    name: "Blogs",
    link: "/hello",
  },
  {
    name: "Features",
    link: "/hello",
  },
  {
    name: "Policy",
    link: "/hello",
  },
];

const Navbar = () => {
  return (
    <div className="my-3">
      <div className="flex items-center max-w-5xl mx-auto px-4 py-2 bg-transparent border rounded-lg backdrop-blur-lg shadow-lg">
        <div className="flex items-center">
          <MicVocal />
          <p className="ml-2">Spacer</p>
        </div>
        <div className="w-full mx-10 flex justify-around">
          {NavbarInfo.map(({ link, name }, idx) => (
            <div key={idx}>
              <Link href={link}>
                <p className="text-sm font-light">{name}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex gap-6">
            <Button>Login</Button>
            <Button>Docs</Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
