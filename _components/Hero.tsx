import TorusModel from "../_components/threejs/TorusModel";
import Cube from "./threejs/cube";

export default function Hero() {
  const age = new Date().getFullYear() - 2003;

  return (
    <div className="sticky top-0 z-0">
      {/* Background Torus */}
      {/* <div className="absolute inset-0  top-5 -z-[0] pointer-events-none">
        <TorusModel />
      </div> */}

      {/* Content */}
      <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen px-6 md:px-12 lg:px-24 py-16">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center mt-16 items-center lg:items-start text-center lg:text-left lg:mt-0 lg:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Thibault Weytens
          </h1>
          <p className="text-lg text-background3 md:text-xl mb-2">
            FULLSTACK DEVELOPER
          </p>
          <p className="text-lg md:text-xl">Ripe age of {age}</p>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-[300px] sm:h-[350px] md:h-[400px]">
            <Cube />
          </div>
        </div>
      </div>
    </div>
  );
}
