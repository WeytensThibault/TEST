"use client";
import TorusModel from "../../_components/threejs/TorusModel";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const TITLES = ["3D Animator", "Full Stack Developer", "Video Editor"];

export default function Hero() {
  const age = new Date().getFullYear() - 2003;
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedLetters, setDisplayedLetters] = useState<string[]>([]);
  const [phase, setPhase] = useState<"erasing" | "typing">("typing");

  useEffect(() => {
    const currentTitle = TITLES[titleIndex];
    let timeout: NodeJS.Timeout;

    if (phase === "typing") {
      if (displayedLetters.length < currentTitle.length) {
        timeout = setTimeout(() => {
          setDisplayedLetters(
            currentTitle.slice(0, displayedLetters.length + 1).split("")
          );
        }, 80);
      } else {
        timeout = setTimeout(() => setPhase("erasing"), 1500);
      }
    } else if (phase === "erasing") {
      if (displayedLetters.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedLetters(displayedLetters.slice(0, -1));
        }, 50);
      } else {
        setTitleIndex((prev) => (prev + 1) % TITLES.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedLetters, phase, titleIndex]);

  return (
    <>
      <div className="px-20 mt-40 relative flex flex-col md:flex-row justify-center items-center h-screen md:mt-10">
        <div className=" relative z-10 flex flex-col justify-center items-start text-left md:w-2/3">
          <h1 className="text-white text-7xl md:text-6xl font-title font-extrabold drop-shadow-lg">
            Thibault Weytens
          </h1>

          <h2 className="text-white flex-wrap text-3xl md:text-4xl mt-4 font-title tracking-wide flex gap-1 min-h-[2.5rem]">
            {displayedLetters.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.1 }}
              >
                {char}
              </motion.span>
            ))}
          </h2>

          <div className="mt-8 text-white text-md font-light">
            <p>{age} years old</p>
            <p>Belgium</p>
            <p>Howest, VTI Deinze</p>
          </div>
          <Link
            href="/aboutme"
            className="px-6 mt-4 bg-dark bg-black text-white  py-2 border-2 border-white rounded-full transition duration-300 hover:bg-white hover:text-black font-semibold"
          >
            About Me
          </Link>
        </div>

        <div className=" z-10 flex justify-center  align-start md:w-1/3">
          <Image
            src="/img/me.png"
            alt="Thibault Weytens"
            className=" mt-10 "
            width={400}
            height={400}
          />
        </div>
        <div className="absolute top-[-100] inset-0 z-0 flex justify-center items-center pointer-events-none">
          <TorusModel />
        </div>
      </div>
    </>
  );
}
