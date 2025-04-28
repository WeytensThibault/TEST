"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [showToast, setShowToast] = useState(false);

  const handleCopyEmail = () => {
    const email = "thibi46" + "@" + "gmail.com";
    navigator.clipboard.writeText(email);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <footer
      id="contact"
      className="text-white py-6 border-t-2 border-white relative"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 flex flex-col gap-2 items-center md:items-start">
            <h3 className="font-semibold text-4xl">Thibault Weytens</h3>
            <Link
              href="/aboutme"
              className="text-2xl transition duration-200 hover:underline hover:text-gray-300"
            >
              Contact me
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center">
            <a
              href="https://www.linkedin.com/in/thibault-weytens-285092341/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border-2 border-white rounded-full transition duration-300 hover:bg-white hover:text-black font-semibold"
            >
              LinkedIn
            </a>

            <button
              onClick={handleCopyEmail}
              className="px-6 py-2 border-2 border-white rounded-full transition duration-300 hover:bg-white hover:text-black font-semibold"
            >
              Copy Email
            </button>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded-full shadow-lg animate-fadeInOut z-[1000]">
          Email copied to clipboard! 📋
        </div>
      )}
    </footer>
  );
}
