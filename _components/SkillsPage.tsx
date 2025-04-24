"use client";
import Image from "next/image";
import { JSX, useEffect, useRef, useState } from "react";
import {
  SiReact,
  SiAngular,
  SiJavascript,
  SiSharp,
  SiSpringboot,
  SiPhp,
  SiMysql,
  SiVuedotjs,
  SiFigma,
  SiAdobexd,
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAdobeaftereffects,
  SiAdobepremierepro,
  SiBlender,
  SiSony,
} from "react-icons/si";

export default function Skillspage() {
  const [scrollY, setScrollY] = useState(0);
  const ticking = useRef(false);

  const handleScroll = () => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        ticking.current = false;
      });
      ticking.current = true;
      console.log(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const translateY = Math.min(scrollY * 0.5 - 400, 0); // Start at -350 and slowly come into view

  const Skills = {
    tools: [
      "Angular",
      "React",
      "C#",
      "JavaScript",
      "SpringBoot",
      "PHP",
      "MySQL",
      "Vue",
      "Java",
      "Figma",
      "Adobe XD",
      "Illustrator",
      "Photoshop",
      "Premiere Pro",
      "After Effects",
      "Blender",
      "Sony Vegas",
    ],
  };

  const toolIcons: Record<string, JSX.Element> = {
    React: <SiReact />,
    Angular: <SiAngular />,
    JavaScript: <SiJavascript />,
    "C#": <SiSharp />,
    SpringBoot: <SiSpringboot />,
    PHP: <SiPhp />,
    MySQL: <SiMysql />,
    Vue: <SiVuedotjs />,
    Figma: <SiFigma />,
    "Adobe XD": <SiAdobexd />,
    Illustrator: <SiAdobeillustrator />,
    Photoshop: <SiAdobephotoshop />,
    "After Effects": <SiAdobeaftereffects />,
    "Premiere Pro": <SiAdobepremierepro />,
    Blender: <SiBlender />,
    "Sony Vegas": <SiSony />,
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-16 relative min-h-screen text-white">
      {/* Top image with scroll effect */}
      <Image
        src="/svg/top.svg"
        alt="top icon"
        width={0}
        height={0}
        className="w-full h-auto fixed top-0 left-0 z-[50]"
        style={{
          transform: `translateY(${translateY}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Skills Section */}
      <div className="absolute top-30 left-0 w-full z-[50] px-4 sm:px-6 md:px-8 lg:px-12 pb-20">
        <h1 className="text-6xl pb-10 font-bold mb-6 ">My Skills</h1>

        <div className="flex flex-wrap gap-4">
          {Skills.tools.map((item, index) => (
            <div
              key={index}
              className="flex items-center text-green-900 gap-2 px-4 py-2 border border-white bg-background3 rounded-lg bg-opacity-10 hover:bg-opacity-20 transition hover:scale-105"
            >
              {toolIcons[item] && (
                <span className="text-xl ">{toolIcons[item]}</span>
              )}
              <span className="text-base ">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom image */}
      <Image
        src="/svg/bottom.svg"
        alt="bottom icon"
        width={0}
        height={0}
        className="w-full h-auto z-[1] relative mt-[-80px]"
      />
    </div>
  );
}
