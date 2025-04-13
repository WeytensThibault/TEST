"use client";
import Link from "next/link";
import ThreeScene from "./threejs/ThreeScene";

export default function Navbar() {
  return (
    <nav className="flex items-center shadow-lg border-b-2 border-cyan-100 shadow-cyan-100/50 justify-between px-6  bg-primal text-white">
      <div className="w-16 ">
        <ThreeScene />
      </div>

      <ul className="flex space-x-4 pr-10">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/aboutme">About me</Link>
        </li>
      </ul>
    </nav>
  );
}
