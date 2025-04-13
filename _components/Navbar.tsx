"use client";

import ThreeScene from "./threejs/ThreeScene";

export default function Navbar() {
  return (
    <nav className="flex items-center shadow-lg border-b-2 border-cyan-100 shadow-cyan-100/50 justify-between px-6  bg-primal text-white">
      {/* Left Side - Logo */}
      <div className="w-16 ">
        <ThreeScene />
      </div>

      <ul className="flex space-x-4 pr-10">
        <li className="cursor-pointer">Home</li>
        <li className="cursor-pointer">Skills</li>
        <li className="cursor-pointer">Projects</li>
      </ul>
    </nav>
  );
}
