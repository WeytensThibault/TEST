import TorusModel from "../_components/threejs/TorusModel";

export default function Hero() {
  const age = new Date().getFullYear() - 2003;

  return (
    <>
      {/* 👇 3D Torus in the background */}
      <div className="absolute inset-0 z-0 -top-45 pointer-events-none">
        <TorusModel />
      </div>

      {/* 👇 Hero content */}
      <div className=" font-title relative h-100 top-30 flex flex-col justify-center items-center text-center px-6 mt-15 z-10">
        <h1 className="text-white  text-7xl md:text-8xl font-extrabold drop-shadow-lg">
          Thibault Weytens
        </h1>
        <h2 className="text-white text-3xl md:text-4xl mt-4 font-medium tracking-wide">
          Creative Developer & Student
        </h2>

        <div className="mt-8 text-white text-md  font-light">
          <p>{age} years old</p>
          <p>Belgium</p>
          <p>Howest, VTI Deinze</p>
        </div>
      </div>
    </>
  );
}
