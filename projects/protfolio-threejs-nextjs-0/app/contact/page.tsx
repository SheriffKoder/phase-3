"use client"

import Contact from "@/components/Contact/Contact";
import TransitionEffect from "@/components/Scroll/TransitionEffect";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";  //needed for the exist option in transition effect to work
import { usePathname } from "next/navigation";
import { useState } from "react";
//this is the home page components wrapper
export default function Home() {
  const path = usePathname().split("/")[1];

  //for the exit animation of the transition effect
  const [play, SetPlay] = useState("false");

  return (
    <>
    {/* // <div className="relative z-0"> */}
    
          {/* // <TransitionEffect/> */}
      <AnimatePresence mode="wait">
      
      {/* <Contact key={play} SetPlay={SetPlay}/> */}

      <Contact/>
      </AnimatePresence>

      {/* // background-color but not over the hero overlay */}
      {/* // <div className="earth_ambient min-h-[80vh]"> */}
      {/* // </div> */}
    {/* // </div> */}

    </>
  );
}