"use client";

import { useEffect, useState } from "react";
import FaceModel from "./threejs/Face";

export default function Loader() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setFadeOut(true);
      // Re-enable scroll after fade out starts
      setTimeout(() => {
        document.body.style.overflow = "";
      }, 1000); // match transition-opacity duration
    }, 2000);

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-black text-white flex items-center justify-center transition-opacity duration-1000 z-[999] ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <FaceModel />
    </div>
  );
}
