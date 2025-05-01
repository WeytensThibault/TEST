"use client";

import TorusModel from "./threejs/TorusModel";
import { useState } from "react";
import Image from "next/image";

export default function ProjectsPagea() {
  const workExperience = [
    {
      logo: "./img/mateco.png",
      title: "Mateco IT",
      subtitle: "(intern)",
      description: "Frontend Developer – Working with Angular",
      date: "2024 - 4 months",
    },
    {
      logo: "./img/ikologik.jpeg",
      title: "Ikologik",
      subtitle: "(part-time)",
      description:
        "Backend Developer – Turning A Spring service application to pure Java",
      date: "2025 - 2 months",
    },
  ];

  const projects = [
    {
      image: "/img/pokewalker.png",
      title: "Pokewalker",
      technologies: ["Flutter", "Firebase"],
      description: "A mobile app to motivate Pokémon fans to walk.",
      longDescription:
        " a mobile application designed to encourage physical activity among Pokémon enthusiasts by gamifying the walking experience. Built with Flutter for cross-platform compatibility and Firebase for backend services, this app transforms daily steps into an exciting Pokémon adventure.",
    },
    {
      image: "/img/makeyourmove.png",
      title: "Make Your Move",
      technologies: ["Vue", "Tensorflow"],
      description:
        "An application that uses AI to detect how many exercises you perform.",
      longDescription:
        "an innovative application that leverages artificial intelligence to track and count your physical exercises in real-time. Built using Vue.js for the frontend and TensorFlow for the AI capabilities, this application transforms the way users monitor their workout progress.",
    },
    {
      image: "/img/b&b.png",
      title: "Bubbles & Breeze",
      technologies: ["Craft CMS", "HTML/CSS/JS"],
      description:
        "A school project where we had to create a webshop for the company Bubbles & Breeze.",
      longDescription:
        "Bubbles & Breeze is a comprehensive e-commerce website developed as an academic project, showcasing the implementation of modern web development techniques and content management systems. This project demonstrates the full lifecycle of creating a functional webshop for a fictional bath and body care company.",
    },
    {
      image: "/your-image.jpg",
      title: "Weight scanner app",
      technologies: ["Tensorflow/openCV", "Flutter"],
      description: "A mobile app used to easily track your fitness. (WIP)",
      longDescription:
        "A mobile fitness tracking solution currently under development, designed to simplify the process of monitoring and recording workout data. By leveraging advanced computer vision technology, this application aims to revolutionize how fitness enthusiasts track their progress in the gym.",
    },
  ];

  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const handleLearnMore = (index: number) => {
    setSelectedProject(index);
  };

  const handleClosePanel = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <div className="mb-15 mt-10 sm:mt-0">
        <h1 className="text-4xl text-white font-bold text-center">Worked at</h1>

        <div className="flex flex-col md:flex-row justify-center gap-6 mt-4 px-10">
          {workExperience.map((job, index) => (
            <div
              key={index}
              className="flex items-start border-1 border-white p-6 shadow-lg w-full max-w-md text-white"
            >
              <Image
                src={job.logo}
                width={50}
                height={50}
                className="h-12  w-12 rounded-lg mr-2 object-cover"
                alt={`${job.title} Logo`}
              />
              <div className="flex-grow">
                <div className="flex items-baseline justify-between">
                  <h2 className="text-xl font-semibold">
                    {job.title}{" "}
                    <span className="text-gray-300 text-sm font-normal">
                      {job.subtitle}
                    </span>
                  </h2>
                  <span className="text-sm text-gray-400">{job.date}</span>
                </div>
                <p className="text-sm text-gray-300 mt-1">{job.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative text-white mt-10 mb-30">
        <h2 className="text-3xl font-bold text-center mb-6">Projects</h2>
        <div className="absolute inset-0 -z-[100] -top-0 pointer-events-none">
          <TorusModel modelPath="/models/torus2.glb" />
        </div>

        <div className="flex flex-wrap  justify-center gap-8 px-4 relative z-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="w-full p-4 md:w-[270px] border-1 border-white overflow-hidden bg-black"
            >
              <Image
                width={50}
                height={50}
                src={project.image}
                alt={`${project.title} Preview`}
                className="w-full h-48 object-cover mb-4 rounded-xl"
              />
              <div className=" text-black">
                <h3 className="text-xl text-white font-semibold mb-2">
                  {project.title}
                </h3>
                <div className="flex gap-2 mb-3 flex-wrap">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-gray-200 text-sm px-3 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-white text-sm mb-4">{project.description}</p>
                <button
                  onClick={() => handleLearnMore(index)}
                  className="bg-black border-2 border-white cursor-pointer flex align-center justify-center mx-auto text-white px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300"
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed  top-0 left-0 h-screen w-full z-[999] pointer-events-none">
          <div
            className={`absolute  border-white border-2 top-0 left-0 h-full transition-all duration-500 ease-in-out
            ${selectedProject !== null ? "translate-x-0" : "-translate-x-full"}
            w-full md:w-1/2 bg-black/90 backdrop-blur-lg p-8 pointer-events-auto`}
          >
            {selectedProject !== null && (
              <div className="flex flex-col justify-center  h-full text-white  relative">
                <button
                  onClick={handleClosePanel}
                  className="absolute top-6 cursor-pointer right-6 bg-white text-black px-3 py-1 rounded hover:bg-gray-300 transition"
                >
                  X
                </button>
                <Image
                  width={50}
                  height={50}
                  src={projects[selectedProject].image}
                  alt={`${projects[selectedProject].title} Preview`}
                  className="w-full h-48 object-cover mb-4 rounded-xl"
                />
                <h3 className="text-3xl font-bold mb-4">
                  {projects[selectedProject].title}
                </h3>
                <p className="text-gray-300 mb-6">
                  {projects[selectedProject].longDescription}
                </p>
                <div className="flex flex-wrap gap-2 ">
                  {projects[selectedProject].technologies.map(
                    (tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-white text-black text-sm px-3 py-1 rounded"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
