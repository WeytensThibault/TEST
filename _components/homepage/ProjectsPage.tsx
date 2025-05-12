"use client";

import TorusModel from "../../_components/threejs/TorusModel";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";
import { projects } from "../../data/ProjectDataJson";
import { workExperience } from "../../data/WorkExperience";
workExperience;
export default function ProjectsPagea() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const projectsSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {});
      },
      { threshold: 0.5 }
    );

    if (projectsSectionRef.current) {
      observer.observe(projectsSectionRef.current);
    }

    return () => {
      if (projectsSectionRef.current) {
        observer.unobserve(projectsSectionRef.current);
      }
    };
  }, []);

  const handleLearnMore = (index: number) => {
    setSelectedProject(index);
  };

  const handleClosePanel = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <div className=" ">
        <div className="flex items-center justify-center my-6">
          <div className="flex-grow border-t border-gray-400 mx-4 glow-line"></div>
          <h1 className="text-4xl  text-white font-bold text-center">
            Worked at
          </h1>
          <div className="flex-grow border-t border-gray-400 mx-4 glow-line"></div>
        </div>

        <div className="flex mt-10 flex-col md:flex-row justify-center gap-6 mt-4 mx-4 ">
          {workExperience.map((job, index) => (
            <div
              key={index}
              className="relative border flex border-white p-6 shadow-lg w-full max-w-md text-white"
            >
              <Image
                src={job.logo}
                width={50}
                height={50}
                className="h-12  w-12 mb-2 mr-2 object-cover"
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

      <div
        ref={projectsSectionRef}
        className="relative text-white mt-10 mt-20 mb-15"
      >
        <div className="flex mb- items-center justify-center my-6">
          <div className="flex-grow border-t border-gray-400 mx-4 glow-line"></div>
          <h2 className="text-3xl font-bold text-center">Projects</h2>
          <div className="flex-grow border-t border-gray-400 mx-4 glow-line"></div>
        </div>
        <div className="absolute inset-0 -z-[100] -top-0 pointer-events-none">
          <TorusModel modelPath="/models/torus2.glb" />
        </div>

        <div className="relative z-10  overflow-visible">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            pagination={false}
            breakpoints={{
              768: { slidesPerView: 2.5 },
              1024: { slidesPerView: 4 },
            }}
            navigation={{
              prevEl: "#prev",
              nextEl: "#next",
            }}
            className="pb-10 "
          >
            {projects.map((project, index) => (
              <SwiperSlide key={index}>
                <div className="border mx-4 border-white bg-black p-4 flex flex-col h-[450px]">
                  <Image
                    width={50}
                    height={50}
                    src={project.image}
                    alt={`${project.title} Preview`}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-gray-200  text-black text-sm px-3 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm h-15 mb-4">{project.description}</p>
                  </div>
                  <button
                    onClick={() => handleLearnMore(index)}
                    className="bg-black border-2 border-white cursor-pointer flex align-center justify-center mt-auto text-white px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300"
                  >
                    Learn More
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex justify-between items-center mb-4">
            <div
              id="prev"
              className="cursor-pointer  text-white text-5xl p-6 m-4  hover:text-gray-400 transition-transform transform hover:scale-110"
              aria-label="Previous Slide"
            >
              &larr;
            </div>
            <div
              id="next"
              className="cursor-pointer  text-white text-5xl p-6 m-4  hover:text-gray-400 transition-transform transform hover:scale-110"
              aria-label="Next Slide"
            >
              &rarr;
            </div>
          </div>
        </div>
      </div>

      <div className="fixed top-0 left-0 h-screen w-full z-[999] pointer-events-none">
        <div
          className={`absolute border-white border-2 top-0 left-0 h-full transition-all duration-500 ease-in-out
          ${selectedProject !== null ? "translate-x-0" : "-translate-x-full"}
          w-full md:w-1/2 bg-black/90 backdrop-blur-lg p-8 pointer-events-auto`}
        >
          {selectedProject !== null && (
            <div className="flex flex-col justify-center h-full text-white relative">
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

      <style jsx>{`
        .glow-line {
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </>
  );
}
