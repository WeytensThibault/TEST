"use client";
import TorusModel from "../_components/threejs/TorusModel";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TITLES = [
  "3D Animator",
  "Full Stack Developer",
  "Video Editor",
  "Aspiring Cloud Engineer",
];

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
      <div className="absolute inset-0 z-0 -top-45 pointer-events-none">
        <TorusModel />
      </div>

      <div className="font-title relative h-100 top-30 flex flex-col justify-center items-center text-center px-6 mt-15 z-10">
        <h1 className="text-white text-7xl md:text-8xl font-extrabold drop-shadow-lg">
          Thibault Weytens
        </h1>

        <h2 className="text-white text-3xl md:text-4xl mt-4 font-title tracking-wide flex gap-1 min-h-[2.5rem]">
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
      </div>
    </>
  );
}
