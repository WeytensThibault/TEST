"use client";

import { JSX } from "react";
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
    <div className=" w-full flex flex-col items-center justify-center px-10 py-16">
      <div className="flex flex-wrap justify-center pt-2 ">
        {Skills.tools.map((item, index) => (
          <p
            key={index}
            className={`flex items-center gap-2 p-2 m-1 border-2 text-white  transition duration-200 hover:scale-105 pointer-events-auto`}
          >
            {toolIcons[item] && (
              <span className="text-[20px]">{toolIcons[item]}</span>
            )}
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
