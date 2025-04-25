import TorusModel from "./threejs/TorusModel";

export default function ProjectsPagea() {
  // Array of work experience data
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

  // ---- PROJECT DATA ----
  const projects = [
    {
      image: "/your-image.jpg",
      title: "Pokewalker",
      technologies: ["Flutter", "Firebase"],
      description: "A mobile app to motivate Pokémon fans to walk.",
    },
    {
      image: "/your-image.jpg",
      title: "Make Your Move",
      technologies: ["Vue", "Tensorflow"],
      description:
        "A application that uses AI to detect how many exercises you perform.",
    },
    {
      image: "/your-image.jpg",
      title: "Bubbles & Breeze",
      technologies: ["Craft CMS", "HTML/CSS/JS"],
      description:
        "A school project where we had to create a webshop for the company Bubbles & breeze.",
    },
    {
      image: "/your-image.jpg",
      title: "Weight scanner app",
      technologies: ["Tensorflow/openCV", "Flutter"],
      description: "A mobile app used to easily track your fitness. (WIP)",
    },
  ];

  return (
    <>
      <div className="mb-15 ">
        <h1 className="text-4xl text-white font-bold text-center">Worked at</h1>

        <div className="flex flex-col md:flex-row justify-center gap-6 mt-4 px-10">
          {workExperience.map((job, index) => (
            <div
              key={index}
              className="flex items-start border-1 border-white p-6 shadow-lg w-full max-w-md text-white"
            >
              <img
                className="h-12 w-12 rounded-lg mr-2 object-cover"
                src={job.logo}
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
      <div className="relative  text-white mt-10">
        <h2 className="text-3xl font-bold text-center mb-6">Projects</h2>
        <div className="absolute inset-0 -z-[100] -top-0 pointer-events-none">
          <TorusModel modelPath="/models/torus2.glb" />
        </div>
        <div className="flex flex-wrap  justify-center gap-8 px-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="w-full bg-black md:w-[270px] z-50 bg-dark border-1 border-white overflow-hidden"
            >
              <img
                src={project.image}
                alt={`${project.title} Preview`}
                className="w-full p-2 h-48 object-cover"
              />
              <div className="p-6 text-black">
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
                <p className="text-white text-sm">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
