"use client";

import { useEffect, useState } from "react";
import Loader from "../_components/Loader";

import Navbar from "../_components/Navbar";

import Footer from "../_components/Footer";
import Hero from "../_components/homepage/Hero";
import ProjectsPage from "../_components/homepage/ProjectsPage";
import SkillsPage from "../_components/homepage/SkillsPage";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading && <Loader />}
      <Navbar />
      <Hero />
      <SkillsPage />
      <ProjectsPage />
      <Footer />
    </div>
  );
}
