import SkillsPage from "../_components/SkillsPage";
import Hero from "../_components/Hero";
import Navbar from "../_components/Navbar";
import ProjectsPage from "../_components/ProjectsPage";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <SkillsPage />
      <ProjectsPage />
    </div>
  );
}
