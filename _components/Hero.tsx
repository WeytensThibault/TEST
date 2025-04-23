import TorusModel from "../_components/threejs/TorusModel";

export default function Hero() {
  const age = new Date().getFullYear() - 2003;

  return (
    <>
      {/* 👇 3D Torus in the background */}
      <div className="absolute inset-0 z-0 top-2 pointer-events-none">
        <TorusModel />
      </div>

      {/* 👇 Hero content */}
      <div className="relative h-100 flex flex-col justify-center items-center text-center px-6 mt-15 z-10"></div>
    </>
  );
}
