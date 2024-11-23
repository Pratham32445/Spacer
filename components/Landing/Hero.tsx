"use client";
import React from "react";
import Gradienttext from "@/components/Gradienttext";
import { Button } from "@/components/ui/button";
import Ripple from "@/components/ui/ripple";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="relative z-20 flex h-[600px] w-full overflow-hidden rounded-lg bg-background p-20">
        <div className="w-full flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            <Gradienttext />
            <p className="z-10 text-6xl font-medium tracking-tighter text-black dark:text-white text-center">
              Create spaces, stream music, <br /> connect live, your social
              symphony awaits
            </p>
            <p className="p-2 z-10 text-xl font-medium tracking-tighter  text-center text-neutral-500">
              Platform for creating music-driven social spaces.
              <br />
              Build communities, manage shared music queues
            </p>
            <div className="flex justify-center items-center my-5 gap-4">
              <Button className="font-bold p-5 rounded">
                Start Exploring <ChevronRight />
              </Button>
              <Button variant={"outline"} className="font-bold p-5 rounded">
                Know About us
              </Button>
            </div>
          </motion.div>
        </div>
        <Ripple className="z-50" mainCircleSize={300} />
      </div>
    </div>
  );
};

export default Hero;
