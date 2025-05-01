"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const sections = ["home", "contact"];

export default function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);

      if (window.scrollY === 0) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-[500] transition-all duration-300
        w-[70%] border-t-2 border-b-2 border-white
        bg-background2 text-white shadow-md
        flex items-center justify-center
        ${
          isAtTop
            ? "h-20 mt-5 bg-black"
            : "h-12 mt-2 bg-black/80 backdrop-blur-md"
        }`}
    >
      <div className="flex justify-center">
        <ul className="flex justify-evenly space-x-10 font-bold relative">
          <li>
            {pathname === "/" ? (
              <Link
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setActiveSection("home");
                }}
                className={`p-2 transition-all duration-300 ${
                  activeSection === "home"
                    ? "underline underline-offset-8 decoration-4 decoration-pink-500 text-pink-300 drop-shadow-glow"
                    : "hover:underline hover:text-gray-300"
                }`}
              >
                Home
              </Link>
            ) : (
              <Link
                href="/"
                className="p-2 transition-all duration-300 hover:underline hover:text-gray-300"
              >
                Home
              </Link>
            )}
          </li>

          <li>
            {pathname === "/" ? (
              <a
                href="#contact"
                className={`p-2 transition-all duration-300 ${
                  activeSection === "contact"
                    ? "underline underline-offset-8 decoration-4 decoration-green-400 text-green-300 drop-shadow-glow"
                    : "hover:underline hover:text-gray-300"
                }`}
              >
                Contact
              </a>
            ) : (
              <Link
                href="/#contact"
                className="p-2 transition-all duration-300 hover:underline hover:text-gray-300"
              >
                Contact
              </Link>
            )}
          </li>
          <li>
            <Link
              href="/aboutme"
              className={`p-2 transition-all duration-300 ${
                pathname === "/aboutme"
                  ? "underline underline-offset-8 decoration-4 decoration-cyan-400 text-cyan-300 drop-shadow-glow"
                  : "hover:underline hover:text-gray-300"
              }`}
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
