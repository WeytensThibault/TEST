"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-[500] transition-all duration-300 
        w-[70%] border-t-2 border-b-2 border-white 
        bg-background2 text-white shadow-md 
        flex items-center justify-center
        ${
          isAtTop ? "h-20 mt-5" : "h-12 mt-2"
        } hover:bg-white hover:color-black-500`}
    >
      <div className="flex justify-center">
        <ul className="flex justify-evenly space-x-10 font-bold">
          <li>
            <Link
              href="/"
              className="p-2 transition duration-200 hover:underline hover:text-gray-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="p-2 transition duration-200 hover:underline hover:text-gray-300"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/aboutme"
              className="p-2 transition duration-200 hover:underline hover:text-gray-300"
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
