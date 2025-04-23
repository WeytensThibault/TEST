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
      <div className="mb-15 mt-">
        <h1 className="text-4xl  text-white font-bold text-center">
          Worked at
        </h1>

        <div className="flex flex-col  md:flex-row justify-center gap-6 mt-4 px-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex items-start border-1 border-white p-6  shadow-lg w-full max-w-md text-white"
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
      </div>
      <div className="text-white  mt-10">
        <h2 className="text-3xl font-bold text-center mb-6">Projects</h2>

        <div className="flex flex-wrap justify-center gap-8 px-4">
          {/* Card 1 */}

          <div className="w-full md:w-[300px] bg-dark border-1 border-white   overflow-hidden">
            <img
              src="/your-image.jpg"
              alt="Project 3"
              className="w-full p-2 h-48 object-cover"
            />
            <div className="p-6 text-black">
              <h3 className="text-xl text-white font-semibold mb-2">
                Pokewalker
              </h3>
              <div className="flex gap-2 mb-3 flex-wrap">
                <span className="bg-gray-200 text-sm px-3 py-1 rounded-full">
                  Flutter
                </span>
                <span className="bg-gray-200 text-sm px-3 py-1 rounded-full">
                  Firebase
                </span>
              </div>
              <p className="text-white text-sm">
                A mobile app to motivate Pokémon fans to walk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
