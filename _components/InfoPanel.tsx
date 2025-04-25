import { JSX, useEffect, useState } from "react";
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

interface InfoPanelProps {
  active: "Coding" | "Design" | "Video";
}

const contentMap = {
  Coding: {
    description:
      "I began coding in 2022, starting with basic front-end development. After graduating as a front-end developer, I continued my studies in back-end development, ultimately becoming a full-stack developer.",
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
    ],
  },
  Design: {
    description:
      "My journey in design started with UI/UX tools like Figma and Adobe XD. I focus on creating user-friendly, accessible interfaces and enjoy experimenting with animations and microinteractions, combining with 3D visuals.",
    tools: ["Figma", "Adobe XD", "Illustrator", "Photoshop"],
  },
  Video: {
    description:
      "At 15, I started creating YouTube videos and quickly developed a strong community. My editing skills were often praised in the comments, and through this experience, I gained a deep understanding of what engages viewers and what makes content stand out.",
    tools: ["Premiere Pro", "After Effects", "Blender", "Sony Vegas"],
  },
};

// Icon mapping
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

export default function InfoPanel({ active }: InfoPanelProps) {
  const [colorMap] = useState<string[]>([]);
  const [fadeClass, setFadeClass] = useState("fade-in-left");
  const [currentContent, setCurrentContent] = useState(contentMap[active]);

  useEffect(() => {}, [active]);

  useEffect(() => {
    setFadeClass("fade-out-right");
    const timer = setTimeout(() => {
      setCurrentContent(contentMap[active]);
      setFadeClass("fade-in-left");
    }, 300);

    return () => clearTimeout(timer);
  }, [active]);

  if (!currentContent) {
    return (
      <div className="text-white">
        <p>Error: No content found for this category.</p>
      </div>
    );
  }

  return (
    <div className="px-20 ">
      <div className="flex w-full min-h-screen">
        <div className="relative w-[4px] pl-10">
          <div className="absolute left-1/2 top-0 h-3/6 w-[2px] bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.6)]" />
        </div>

        <div className={`flex-1 px-4 py-2`}>
          <h1 className="text-white  text-xl font-semibold">
            - My experience in {active}.
          </h1>
          <p className={`text-white pt-4 ${fadeClass}`}>
            - {currentContent.description}
          </p>

          <div className="flex flex-wrap pt-2">
            {currentContent.tools.map((item, index) => (
              <p
                key={index}
                className={`flex items-center gap-2 p-2 m-1 ${
                  colorMap[index % colorMap.length] || "bg-white"
                } ${fadeClass} text-black rounded transition duration-200`}
              >
                {toolIcons[item] && (
                  <span className="text-[20px]">{toolIcons[item]}</span>
                )}
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
