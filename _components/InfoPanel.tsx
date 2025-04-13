"use client";

import { useEffect, useState } from "react";

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

export default function InfoPanel({ active }: InfoPanelProps) {
  const codingKnowledge = [
    "Angular",
    "React",
    "C#",
    "JavaScript",
    "SpringBoot",
    "PHP",
    "MySQL",
    "Vue",
  ];

  const bgColors = ["bg-white", "bg-gray-400", "bg-gray-600"];
  const [colorMap, setColorMap] = useState<string[]>([]);
  const [fadeClass, setFadeClass] = useState("fade-in-left");
  const [currentContent, setCurrentContent] = useState(contentMap[active]);

  useEffect(() => {
    const randomized = codingKnowledge.map(() => {
      return bgColors[Math.floor(Math.random() * bgColors.length)];
    });
    setColorMap(randomized);
  }, []);

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
    <div className="px-20">
      <p className="text-white text-2xl font-bold pb-4">Info:</p>
      <div className="flex w-full min-h-screen">
        <div className="relative w-[4px] pl-10">
          <div className="absolute left-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_12px_4px_rgba(255,255,255,0.8)] top-4 transform -translate-x-1/2" />
          <div className="absolute left-1/2 top-0 h-3/6 w-[2px] bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.6)]" />
        </div>

        <div className={`flex-1 px-4 py-2`}>
          <h1 className="text-white  text-xl font-semibold">
            - My experience in {active}.
          </h1>
          <p className={`text-white pt-4 ${fadeClass}`}>
            - {currentContent.description}
          </p>

          <p className={` pt-4 text-l font-bold text-white ${fadeClass}`}>
            Tools:
          </p>
          <div className="flex flex-wrap pt-2">
            {currentContent.tools.map((item, index) => (
              <p
                key={index}
                className={`p-2 m-1 ${
                  colorMap[index % colorMap.length] || "bg-white"
                } ${fadeClass} text-black rounded transition duration-200`}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
