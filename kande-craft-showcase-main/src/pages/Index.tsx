import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import SoftSkills from "@/components/portfolio/SoftSkills";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import Certificates from "@/components/portfolio/Certificates";
import Education from "@/components/portfolio/Education";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import ScrollProgress from "@/components/portfolio/ScrollProgress";
import CustomCursor from "@/components/portfolio/CustomCursor";
import BackgroundAnimation from "@/components/portfolio/BackgroundAnimation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative z-0">
      <BackgroundAnimation />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <SoftSkills />
      <Experience />
      <Projects />
      <Certificates />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
