"use client";
import Link from "next/link";
import Image from "next/image";
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
      className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-300 overflow-hidden ${
        isAtTop
          ? "w-2/3 opacity-100"
          : "w-44 opacity-50 hover:w-2/3   hover:opacity-100   "
      } bg-background2 text-white shadow-md h-16 mx-auto rounded-b-lg flex items-center m-5`}
    >
      <div className="absolute left-0">
        <Image src="/svg/left.svg" alt="left icon" width={130} height={130} />
      </div>

      <div className="absolute right-0">
        <Image src="/svg/right.svg" alt="right icon" width={80} height={80} />
      </div>

      <div className="container mx-auto flex justify-center">
        <ul className="flex justify-evenly space-x-10 font-bold">
          <li>
            <Link className="p-2 hover:underline" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="p-2 hover:underline" href="/contact">
              Contact
            </Link>
          </li>
          <li>
            <Link className="p-2 hover:underline" href="/aboutme">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
