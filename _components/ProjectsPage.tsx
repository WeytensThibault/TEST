export default function ProjectsPagea() {
  // Array of project data
  const projects = [
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

  return (
    <>
      <h1 className="text-4xl mt-40 text-white font-bold text-center">
        Projects / Experience
      </h1>
      <p className="text-white text-center mt-4">Worked at</p>

      <div className="flex flex-col md:flex-row justify-center gap-6 mt-4 px-10">
        {projects.map((project, index) => (
          <div
            key={index}
            className="flex items-start bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md text-white"
          >
            <img
              className="h-12 w-12 rounded-lg mr-2 object-cover"
              src={project.logo}
              alt={`${project.title} Logo`}
            />

            <div className="flex-grow">
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-semibold">
                  {project.title}{" "}
                  <span className="text-gray-300 text-sm font-normal">
                    {project.subtitle}
                  </span>
                </h2>
                <span className="text-sm text-gray-400">{project.date}</span>
              </div>
              <p className="text-sm text-gray-300 mt-1">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
