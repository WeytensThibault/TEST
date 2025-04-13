import TorusModel from "../_components/threejs/TorusModel";

export default function Hero() {
  const age = new Date().getFullYear() - 2003;

  return (
    <>
      {/* 👇 3D Torus in the background */}
      <div className="absolute inset-0 z-0 top-10 pointer-events-none">
        <TorusModel />
      </div>
      <div className="relative h-screen flex justify-center items-center flex-col">
        <h1 className="text-6xl text-white font-bold  text-center">
          Thibault Weytens
        </h1>
        <h2 className="text-white text-2xl pt-4">Retarded Student</h2>

        <p>🎂 {age}</p>

        <p>📍Belgium</p>

        <p>🎓 Howest, VTI Deinze</p>
      </div>
    </>
  );
}
