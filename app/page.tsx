import SkillsPage from "../_components/SkillsPage";
import Hero from "../_components/Hero";
import Navbar from "../_components/Navbar";
import ProjectsPage from "../_components/ProjectsPage";
import Footer from "../_components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <SkillsPage />
      <ProjectsPage />
      <Footer />
    </div>
  );
}
