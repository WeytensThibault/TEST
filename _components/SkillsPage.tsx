"use client";

import { useState } from "react";
import InfoPanel from "./InfoPanel";
import Pedestals from "./threejs/Pedestals";

export default function Skillspage() {
  const [active, setActiveItem] = useState<"Coding" | "Design" | "Video">(
    "Coding"
  );

  const skills = ["Coding", "Design", "Video"];

  const rotationMap = {
    Coding: 0,
    Design: 120,
    Video: 240,
  };

  return (
    <div className="h-screen border-black">
      <h1 className="text-4xl text-white font-bold text-center">My skills:</h1>
      {/* Skills list at the top for md and smaller screens */}
      <div className="w-full flex flex-col items-center justify-center lg:hidden mt-10">
        <p className="text-white text-2xl font-bold pb-4 text-center">
          My field in:
        </p>
        <ul className="text-white flex justify-between w-1/2 mx-auto mb-6">
          {skills.map((skill) => (
            <li
              key={skill}
              onClick={() =>
                setActiveItem(skill as "Coding" | "Design" | "Video")
              }
              className={`cursor-pointer font-bold text-xl transition duration-300 
              ${
                active === skill
                  ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                  : "text-gray-400"
              }
              hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]`}
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex relative flex-col lg:flex-row mt-10 w-full">
        <div className="w-full z-999 lg:w-3/5">
          <InfoPanel active={active} />
        </div>
        <div className="w-full lg:w-3/5 flex flex-col items-center ">
          <p className="text-white text-2xl font-bold pb-4 text-center hidden lg:block">
            My field in:
          </p>
          <ul className="text-white flex justify-between w-1/2 mx-auto hidden lg:flex">
            {skills.map((skill) => (
              <li
                key={skill}
                onClick={() =>
                  setActiveItem(skill as "Coding" | "Design" | "Video")
                }
                className={`cursor-pointer font-bold text-xl transition duration-300 
                ${
                  active === skill
                    ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    : "text-gray-400"
                }
                hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]`}
              >
                {skill}
              </li>
            ))}
          </ul>

          <div className="w-full h-[400px] overflow-hidden top-40 absolute z-1 opacity-25 lg:block lg:opacity-100 ">
            <Pedestals rotationY={rotationMap[active]} />
          </div>
        </div>
      </div>
    </div>
  );
}
