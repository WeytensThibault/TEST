"use client";
import Link from "next/link";
import ThreeScene from "./threejs/ThreeScene";

export default function Navbar() {
  return (
    <nav className="flex items-center shadow-lg border-1  border-cyan-100  justify-between px-6  bg-primal text-white m-4">
      <div className="w-16 ">
        <ThreeScene />
      </div>

      <ul className="flex space-x-4 pr-10">
        <li>
          <Link className="p-2 border-1" href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="p-2 border-1" href="/aboutme">
            About me
          </Link>
        </li>
      </ul>
    </nav>
  );
}
