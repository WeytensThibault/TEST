"use client";

import { useState } from "react";
import InfoPanel from "./InfoPanel";
import Pedestals from "../threejs/Pedestals";

export default function Skillspage() {
  const [active, setActiveItem] = useState<"Coding" | "Cloud" | "Video">(
    "Coding"
  );

  const skills = ["Coding", "Cloud", "Video"];

  const rotationMap = {
    Coding: 0,
    Cloud: 120,
    Video: 240,
  };

  return (
    <div className=" mt-20 border-black md:mt-15">
      <div className="w-full  flex flex-col items-center justify-center lg:hidden mt-0">
        <p className="text-white text-2xl font-bold pb-4 text-center">
          My field in:
        </p>
        <ul className="text-white flex justify-between mx-auto mb-2 md:w-1/2">
          {skills.map((skill) => (
            <li
              key={skill}
              onClick={() =>
                setActiveItem(skill as "Coding" | "Cloud" | "Video")
              }
              className={`cursor-pointer px-2 font-bold text-xl transition-transform duration-300 md:px-0 
              ${
                active === skill
                  ? "text-white scale-105 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                  : "text-white"
              }
              hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]`}
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex  relative flex-col lg:flex-row mt-10 w-full">
        <div className="w-full lg:w-3/5 flex flex-col items-center ">
          <p className="text-white text-2xl font-bold pb-4 text-center hidden lg:block">
            Work experience in:
          </p>
          <ul className="text-white flex justify-between w-1/2 mx-auto hidden lg:flex">
            {skills.map((skill) => (
              <li
                key={skill}
                onClick={() =>
                  setActiveItem(skill as "Coding" | "Cloud" | "Video")
                }
                className={`cursor-pointer border-2 border-white py-1 px-2 font-bold text-xl transition duration-300 transform
                  ${
                    active === skill
                      ? "bg-white text-black scale-105 border-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                      : "text-white"
                  }
                hover:scale-110 hover:bg-white hover:text-black `}
              >
                {skill}
              </li>
            ))}
          </ul>
          <div className="w-full mt-10 h-full  lg:block lg:opacity-100">
            <Pedestals rotationY={rotationMap[active]} />
          </div>
        </div>
        <div className="w-full lg:w-3/5">
          <InfoPanel active={active} />
        </div>
      </div>
    </div>
  );
}
