"use client";

import { useEffect, useState } from "react";
import Loader from "../_components/Loader";
import SkillsPage from "../_components/SkillsPage";
import Hero from "../_components/Hero";
import Navbar from "../_components/Navbar";
import ProjectsPage from "../_components/ProjectsPage";
import Footer from "../_components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading duration or hook into actual asset/model loading logic
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // match with Loader fade duration

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
